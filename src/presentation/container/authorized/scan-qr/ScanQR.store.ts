import {createStore, createHook} from 'react-sweet-state';
import {ScanQRActions} from './ScanQR.action';
import {ScanQRState} from './ScanQR.type';
import {INITIAL_STATE} from './constants';

export const ScanQRStore = createStore<ScanQRState, typeof ScanQRActions>({
  initialState: Object.assign({}, INITIAL_STATE),
  actions: ScanQRActions,
  name: 'ScanQRStore',
});

export const useScanQR = createHook(ScanQRStore);
