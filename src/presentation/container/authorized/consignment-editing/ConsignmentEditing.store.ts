import {createStore, createHook} from 'react-sweet-state';
import {ConsignmentEditingActions} from './ConsignmentEditing.action';
import {ConsignmentEditingState} from './ConsignmentEditing.type';
import {INITIAL_STATE} from './constants';

export const ConsignmentEditingStore = createStore<
  ConsignmentEditingState,
  typeof ConsignmentEditingActions
>({
  initialState: Object.assign({}, INITIAL_STATE),
  actions: ConsignmentEditingActions,
  name: 'ConsignmentEditingStore',
});

export const useConsignmentEditing = createHook(ConsignmentEditingStore);
