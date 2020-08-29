import {Either} from 'tsmonad';
import {Exception} from '@core';
import {
  Distributor,
  PaginationResult,
  DistributorAddingData,
  DistributorEditingData,
} from '../model';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
// import {singleton} from 'tsyringe';
export interface DistributorDataSource {
  add(data: DistributorAddingData): Promise<Either<Exception, Distributor>>;

  remove(id: string): Promise<Either<Exception, boolean>>;

  edit(
    id: string,
    data: DistributorEditingData,
  ): Promise<Either<Exception, void>>;

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

  async add(
    data: DistributorAddingData,
  ): Promise<Either<Exception, Distributor>> {
    const distributor: Distributor = {
      ...data,
      id: uuid.v4(),
      createdAt: new Date().toISOString(),
      deleted: false,
    };
    try {
      await this.firestore
        .collection(FirestoreDistributorDataSource.COLLECTION)
        .doc(distributor.id)
        .set(distributor);
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
        .update({deleted: true});
      return Either.right(true);
    } catch (error) {
      return Either.left(new Exception());
    }
  }
  async edit(
    id: string,
    data: DistributorEditingData,
  ): Promise<Either<Exception, void>> {
    try {
      await this.firestore
        .collection(FirestoreDistributorDataSource.COLLECTION)
        .doc(id)
        .update(data);
      return Either.right(undefined);
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
        .where('deleted', '==', false)
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
      console.log(error);
      return Either.left(new Exception());
    }
  }

  async get(id: string): Promise<Either<Exception, Distributor>> {
    try {
      const document = await this.firestore
        .collection(FirestoreDistributorDataSource.COLLECTION)
        .doc(id)
        .get();
      const distributor = this.documentToDistributor(document);
      return Either.right(distributor);
    } catch (error) {
      return Either.left(new Exception());
    }
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
      createdAt: data!.createdAt,
      deleted: data!.deleted,
    };

    return distributor;
  }
}
