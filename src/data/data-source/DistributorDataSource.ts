import {Either} from 'tsmonad';
import {Exception} from '@core';
import {Distributor, PaginationResult} from '../model';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
// import {singleton} from 'tsyringe';
export interface DistributorDataSource {
  add(distributor: Distributor): Promise<Either<Exception, Distributor>>;

  remove(id: string): Promise<Either<Exception, boolean>>;

  edit(distributor: Distributor): Promise<Either<Exception, Distributor>>;

  list(
    keyword: string,
  ): Promise<Either<Exception, PaginationResult<Distributor>>>;

  get(id: string): Promise<Either<Exception, Distributor>>;
}

// @singleton()
export class FirestoreDistributorDataSource implements DistributorDataSource {
  static readonly COLLECTION = 'Distributor';

  firestore: FirebaseFirestoreTypes.Module;
  constructor() {
    this.firestore = firestore();
  }

  async add(distributor: Distributor): Promise<Either<Exception, Distributor>> {
    try {
      await this.firestore
        .collection(FirestoreDistributorDataSource.COLLECTION)
        .doc(distributor.id)
        .set({...distributor, createdAt: distributor.createdAt.toISOString()});
      return Either.right(distributor);
    } catch (error) {
      return Either.left(new Exception());
    }
  }
  async remove(id: string): Promise<Either<Exception, boolean>> {
    try {
      await this.firestore
        .collection(FirestoreDistributorDataSource.COLLECTION)
        .doc(id)
        .delete();
      return Either.right(true);
    } catch (error) {
      return Either.left(new Exception());
    }
  }
  async edit(
    distributor: Distributor,
  ): Promise<Either<Exception, Distributor>> {
    try {
      await this.firestore
        .collection(FirestoreDistributorDataSource.COLLECTION)
        .doc(distributor.id)
        .update(distributor);
      return Either.right(distributor);
    } catch (error) {
      return Either.left(new Exception());
    }
  }
  async list(
    keyword: string,
  ): Promise<Either<Exception, PaginationResult<Distributor>>> {
    try {
      const snapshot = await this.firestore
        .collection(FirestoreDistributorDataSource.COLLECTION)
        .orderBy('createdAt', 'desc')
        .get();
      const distributors: Distributor[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        if (`${data.name}`.toLowerCase().includes(keyword.toLowerCase())) {
          const distributor = this.documentToDistributor(doc);
          distributors.push(distributor);
        }
      });
      return Either.right<Exception, PaginationResult<Distributor>>({
        pageIndex: 1,
        item: distributors,
        total: distributors.length,
      });
    } catch (error) {
      return Either.left(new Exception());
    }
  }

  async get(id: string): Promise<Either<Exception, Distributor>> {
    const document = await this.firestore
      .collection(FirestoreDistributorDataSource.COLLECTION)
      .doc(id)
      .get();
    const distributor = this.documentToDistributor(document);
    return Either.right(distributor);
  }

  private documentToDistributor(
    doc: FirebaseFirestoreTypes.DocumentSnapshot,
  ): Distributor {
    const data = doc.data();
    const distributor: Distributor = {
      id: doc.id,
      name: data!.name,
      address: data!.address,
      phone: data!.phone,
      createdAt: new Date(data!.createdAt),
    };

    return distributor;
  }
}
