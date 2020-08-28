import {DistributorListStoreApi} from './DistributorList.type';
import {INITIAL_STATE} from './DistributorList.store';
import {FirestoreDistributorDataSource} from '@data';

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
};
