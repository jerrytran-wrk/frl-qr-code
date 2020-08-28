import { ConsignmentListStoreApi} from './ConsignmentList.type';
import {INITIAL_STATE} from './ConsignmentList.store';

export const ConsignmentListActions = {
  reset: () => async ({setState}: ConsignmentListStoreApi) => {
    setState(INITIAL_STATE);
  },
};
