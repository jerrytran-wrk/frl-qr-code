import {createStore, createHook} from 'react-sweet-state';
import {DistributorAddingActions} from './DistributorAdding.action';
import {DistributorAddingState} from './DistributorAdding.type';
import {INITIAL_STATE} from './constants';

export const DistributorAddingStore = createStore<
  DistributorAddingState,
  typeof DistributorAddingActions
>({
  initialState: Object.assign({}, INITIAL_STATE),
  actions: DistributorAddingActions,
  name: 'DistributorAddingStore',
});

export const useDistributorAdding = createHook(DistributorAddingStore);
