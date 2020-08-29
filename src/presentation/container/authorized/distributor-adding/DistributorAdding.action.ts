import {DistributorAddingStoreApi} from './DistributorAdding.type';
import {INITIAL_STATE} from './constants';
import {FirestoreDistributorDataSource} from '@data';

export const DistributorAddingActions = {
  reset: () => async ({setState}: DistributorAddingStoreApi) => {
    setState(INITIAL_STATE);
  },
  add: (name: string, address: string, phone: string) => async ({
    setState,
  }: DistributorAddingStoreApi): Promise<boolean> => {
    setState({isAdding: true});
    const dataSource = new FirestoreDistributorDataSource();
    const result = await dataSource.add({
      name,
      address,
      phone,
    });
    setState({isAdding: false});
    return result.caseOf({right: () => true, left: () => false});
  },
};
