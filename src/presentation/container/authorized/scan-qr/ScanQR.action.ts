import { ScanQRStoreApi} from './ScanQR.type';
import {INITIAL_STATE} from './constants';

export const ScanQRActions = {
  reset: () => async ({setState}: ScanQRStoreApi) => {
    setState(INITIAL_STATE);
  },
};
