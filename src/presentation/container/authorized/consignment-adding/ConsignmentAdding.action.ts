import {ConsignmentAddingStoreApi} from './ConsignmentAdding.type';
import {INITIAL_STATE} from './constants';
import {
  FirestoreConsignmentDataSource,
  FirestoreDistributorDataSource,
  Consignment,
  ConsignmentAddingData,
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
      name: data.name,
      distributorId: data.distributorId,
      createdDate: data.createdDate,
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
