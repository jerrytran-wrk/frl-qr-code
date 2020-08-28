import {DistributorAddingStoreApi} from './DistributorAdding.type';
import {INITIAL_STATE} from './DistributorAdding.store';

export const DistributorAddingActions = {
  reset: () => async ({setState}: DistributorAddingStoreApi) => {
    setState(INITIAL_STATE);
  },
};
