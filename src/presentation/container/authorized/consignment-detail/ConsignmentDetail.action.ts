import {ConsignmentDetailStoreApi} from './ConsignmentDetail.type';
import {INITIAL_STATE} from './constants';
import {
  FirestoreConsignmentDataSource,
  FirestoreDistributorDataSource,
} from '@data';

export const ConsignmentDetailActions = {
  reset: () => ({setState}: ConsignmentDetailStoreApi) => {
    setState(INITIAL_STATE);
  },
  load: (id: string) => async ({setState}: ConsignmentDetailStoreApi) => {
    setState({isLoading: true});
    const dDataSource = new FirestoreDistributorDataSource();
    const dataSource = new FirestoreConsignmentDataSource(dDataSource);
    const result = await dataSource.get(id);
    result.do({
      right: (consignment) => {
        setState({consignment});
      },
    });
    setState({isLoading: false});
  },
};
