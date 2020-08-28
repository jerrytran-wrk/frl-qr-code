import uuid from 'react-native-uuid';
import {DistributorAddingStoreApi} from './DistributorAdding.type';
import {INITIAL_STATE} from './constants';
import {FirestoreDistributorDataSource} from '@data';

export const DistributorAddingActions = {
  reset: () => async ({setState}: DistributorAddingStoreApi) => {
    setState(INITIAL_STATE);
  },
  add: (name: string, address: string, phone: string) => async ({
    setState,
  }: DistributorAddingStoreApi) => {
    setState({isAdding: true});
    const dataSource = new FirestoreDistributorDataSource();
    await dataSource.add({
      id: uuid.v4(),
      name,
      address,
      phone,
      createdAt: new Date(),
    });
    setState({isAdding: false});
  },
};
