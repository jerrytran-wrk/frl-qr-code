import {DistributorListStoreApi} from './DistributorList.type';
import {INITIAL_STATE} from './constants';
import {FirestoreDistributorDataSource} from '@data';

import * as Keychain from 'react-native-keychain';

export const DistributorListActions = {
  reset: () => async ({setState}: DistributorListStoreApi) => {
    setState(INITIAL_STATE);
  },
  refresh: (keyword: string) => async ({setState}: DistributorListStoreApi) => {
    setState({isLoading: true});
    const dataSource = new FirestoreDistributorDataSource();
    const result = await dataSource.list(keyword);
    result.do({
      right: (pagination) => {
        setState({distributors: pagination.item});
      },
    });
    setState({isLoading: false, keyword});
  },
  remove: (id: string) => async ({setState}: DistributorListStoreApi) => {
    setState({isLoading: true});
    const dataSource = new FirestoreDistributorDataSource();
    await dataSource.remove(id);
  },
  signOut: () => async ({setState}: DistributorListStoreApi) => {
    setState({isSigningOut: true});
    const result = await Keychain.resetGenericPassword();
    setState({isSigningOut: false});
    return result;
  },
};
