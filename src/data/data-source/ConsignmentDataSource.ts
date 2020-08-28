import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

import {Either} from 'tsmonad';
import {Exception} from '@core';
import {Consignment, PaginationResult} from '../model';

export interface ConsignmentDataSource {
  add(consignment: Consignment): Promise<Either<Exception, Consignment>>;

  remove(keyword: string): Promise<Either<Exception, boolean>>;

  edit(consignment: Consignment): Promise<Either<Exception, Consignment>>;

  list(
    keyword: string,
    distributorId: string,
  ): Promise<Either<Exception, PaginationResult<Consignment>>>;
}
export class FirestoreConsignmentDataSource implements ConsignmentDataSource {
  static readonly COLLECTION = 'Consignment';

  firestore: FirebaseFirestoreTypes.Module;
  constructor() {
    this.firestore = firestore();
  }
  async add(consignment: Consignment): Promise<Either<Exception, Consignment>> {
    try {
      await this.firestore
        .collection(FirestoreConsignmentDataSource.COLLECTION)
        .doc(consignment.id)
        .set({
          ...consignment,
          createdDate: consignment.createdDate.toISOString(),
          createdAt: consignment.createdAt.toISOString(),
        });
      return Either.right(consignment);
    } catch (error) {
      return Either.left(new Exception());
    }
  }
  async remove(id: string): Promise<Either<Exception, boolean>> {
    try {
      await this.firestore
        .collection(FirestoreConsignmentDataSource.COLLECTION)
        .doc(id)
        .delete();
      return Either.right(true);
    } catch (error) {
      return Either.left(new Exception());
    }
  }
  async edit(
    consignment: Consignment,
  ): Promise<Either<Exception, Consignment>> {
    try {
      await this.firestore
        .collection(FirestoreConsignmentDataSource.COLLECTION)
        .doc(consignment.id)
        .update(consignment);
      return Either.right(consignment);
    } catch (error) {
      return Either.left(new Exception());
    }
  }
  async list(
    keyword: string,
    distributorId: string,
  ): Promise<Either<Exception, PaginationResult<Consignment>>> {
    try {
      const snapshot = await this.firestore
        .collection(FirestoreConsignmentDataSource.COLLECTION)
        .where('distributorId', '==', distributorId)
        .orderBy('createdAt', 'desc')
        .get();
      const consignments: Consignment[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        if (`${data.name}`.toLowerCase().includes(keyword.toLowerCase())) {
          consignments.push({
            id: doc.id,
            name: data.name,
            createdDate: new Date(data.createdDate),
            createdAt: new Date(data.createdAt),
            shipper: data.shipper,
            distributorId: data.distributorId,
          });
        }
      });
      return Either.right<Exception, PaginationResult<Consignment>>({
        pageIndex: 1,
        item: consignments,
        total: consignments.length,
      });
    } catch (error) {
      return Either.left(new Exception());
    }
  }
}
