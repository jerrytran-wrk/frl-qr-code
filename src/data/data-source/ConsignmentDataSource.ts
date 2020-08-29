import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

import {Either} from 'tsmonad';
import {Exception} from '@core';
import {
  Consignment,
  PaginationResult,
  ConsignmentAddingData,
  ConsignmentEditingData,
} from '../model';
import {DistributorDataSource} from './DistributorDataSource';
import uuid from 'react-native-uuid';

export interface ConsignmentDataSource {
  add(data: ConsignmentAddingData): Promise<Either<Exception, Consignment>>;

  remove(keyword: string): Promise<Either<Exception, boolean>>;

  edit(
    id: string,
    data: ConsignmentEditingData,
  ): Promise<Either<Exception, void>>;

  list(
    keyword: string,
    distributorId: string,
  ): Promise<Either<Exception, PaginationResult<Consignment>>>;

  get(id: string): Promise<Either<Exception, Consignment>>;
}
export class FirestoreConsignmentDataSource implements ConsignmentDataSource {
  static readonly COLLECTION = 'Consignment';

  firestore: FirebaseFirestoreTypes.Module;
  constructor(private readonly distributorDataSource?: DistributorDataSource) {
    this.firestore = firestore();
  }

  async add(
    data: ConsignmentAddingData,
  ): Promise<Either<Exception, Consignment>> {
    const consignment: Consignment = {
      ...data,
      createdAt: new Date().toISOString(),
      id: uuid.v4(),
    };
    try {
      await this.firestore
        .collection(FirestoreConsignmentDataSource.COLLECTION)
        .doc(consignment.id)
        .set(consignment);
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
    id: string,
    data: ConsignmentEditingData,
  ): Promise<Either<Exception, void>> {
    try {
      await this.firestore
        .collection(FirestoreConsignmentDataSource.COLLECTION)
        .doc(id)
        .update(data);
      return Either.right(undefined);
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
          const consignment = this.documentToConsignment(doc);
          consignments.push(consignment);
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
  async get(id: string): Promise<Either<Exception, Consignment>> {
    try {
      const document = await this.firestore
        .collection(FirestoreConsignmentDataSource.COLLECTION)
        .doc(id)
        .get();
      const consignment = this.documentToConsignment(document);
      const result = await this.distributorDataSource?.get(
        consignment.distributorId,
      );

      result?.do({
        right: (distributor) => (consignment.distributor = distributor),
      });

      return Either.right(consignment);
    } catch (error) {
      return Either.left(new Exception());
    }
  }

  private documentToConsignment(
    doc: FirebaseFirestoreTypes.DocumentSnapshot,
  ): Consignment {
    const data = doc.data();
    const consignment: Consignment = {
      id: doc.id,
      name: data!.name,
      createdDate: data!.createdDate,
      createdAt: data!.createdAt,
      shipper: data!.shipper,
      distributorId: data!.distributorId,
    };

    return consignment;
  }
}
