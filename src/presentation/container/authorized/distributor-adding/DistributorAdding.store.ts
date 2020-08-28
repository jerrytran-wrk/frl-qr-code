import {createStore, createHook} from 'react-sweet-state';
import {DistributorAddingActions} from './DistributorAdding.action';
import {DistributorAddingState} from './DistributorAdding.type';

export const INITIAL_STATE: DistributorAddingState = {
  status: 'INIT',
};

export const DistributorAddingStore = createStore<
  DistributorAddingState,
  typeof DistributorAddingActions
>({
  initialState: Object.assign({}, INITIAL_STATE),
  actions: DistributorAddingActions,
  name: 'DistributorAddingStore',
});

export const useDistributorAdding = createHook(DistributorAddingStore);
