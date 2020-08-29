import {createStore, createHook} from 'react-sweet-state';
import {DistributorEditingActions} from './DistributorEditing.action';
import {DistributorEditingState} from './DistributorEditing.type';
import {INITIAL_STATE} from './constants';

export const DistributorEditingStore = createStore<
  DistributorEditingState,
  typeof DistributorEditingActions
>({
  initialState: Object.assign({}, INITIAL_STATE),
  actions: DistributorEditingActions,
  name: 'DistributorEditingStore',
});

export const useDistributorEditing = createHook(DistributorEditingStore);
