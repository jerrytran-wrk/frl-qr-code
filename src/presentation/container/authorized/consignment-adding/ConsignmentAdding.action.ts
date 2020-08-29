import uuid from 'react-native-uuid';

import {
  ConsignmentAddingStoreApi,
  ConsignmentAddingData,
} from './ConsignmentAdding.type';
import {INITIAL_STATE} from './constants';
import {
  FirestoreConsignmentDataSource,
  FirestoreDistributorDataSource,
  Consignment,
} from '@data';
import {KeyValuePair} from '@components';

export const ConsignmentAddingActions = {
  reset: () => ({setState}: ConsignmentAddingStoreApi) => {
    setState(INITIAL_STATE);
  },
  add: (data: ConsignmentAddingData) => async ({
    setState,
  }: ConsignmentAddingStoreApi): Promise<Consignment | null> => {
    setState({isAdding: true});
    const dataSource = new FirestoreConsignmentDataSource();
    const result = await dataSource.add({
      id: uuid.v4(),
      name: data.name,
      distributorId: data.distributorId,
      createdDate: data.createdDate,
      createdAt: new Date(),
      shipper: data.shipper,
    });
    setState({isAdding: false});
    return result.caseOf({right: (r) => r, left: () => null});
  },
  loadDistributor: () => async ({setState}: ConsignmentAddingStoreApi) => {
    setState({isLoadDistributor: true});
    const dataSource = new FirestoreDistributorDataSource();
    const result = await dataSource.list('');
    result.do({
      right: (pagination) => {
        const distributors = pagination.item.map(
          (x): KeyValuePair => {
            return {id: x.id, value: x.name};
          },
        );
        setState({distributors});
      },
    });
    setState({isLoadDistributor: false});
  },
};
