import {ConsignmentAddingStoreApi} from './ConsignmentAdding.type';
import {INITIAL_STATE} from './ConsignmentAdding.store';

export const ConsignmentAddingActions = {
  reset: () => async ({setState}: ConsignmentAddingStoreApi) => {
    setState(INITIAL_STATE);
  },
};
