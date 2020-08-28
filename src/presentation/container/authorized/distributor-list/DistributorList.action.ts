import {DistributorListStoreApi} from './DistributorList.type';
import {INITIAL_STATE} from './DistributorList.store';

export const DistributorListActions = {
  reset: () => async ({setState}: DistributorListStoreApi) => {
    setState(INITIAL_STATE);
  },
};
