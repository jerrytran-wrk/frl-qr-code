import {ConsignmentListStoreApi} from './ConsignmentList.type';
import {INITIAL_STATE} from './ConsignmentList.store';
import {FirestoreConsignmentDataSource} from '@data';

export const ConsignmentListActions = {
  reset: () => ({setState}: ConsignmentListStoreApi) => {
    setState(INITIAL_STATE);
  },
  refresh: (keyword: string, distributorId: string) => async ({
    setState,
  }: ConsignmentListStoreApi) => {
    setState({isLoading: true});
    const dataSource = new FirestoreConsignmentDataSource();
    const result = await dataSource.list(keyword, distributorId);
    result.do({
      right: (pagination) => {
        setState({consignments: pagination.item});
      },
    });
    setState({isLoading: false, keyword});
  },
  remove: (id: string) => async ({setState}: ConsignmentListStoreApi) => {
    setState({isLoading: true});
    const dataSource = new FirestoreConsignmentDataSource();
    await dataSource.remove(id);
  },
};
