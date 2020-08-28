import {createStore, createHook} from 'react-sweet-state';
import {ConsignmentAddingActions} from './ConsignmentAdding.action';
import {ConsignmentAddingState} from './ConsignmentAdding.type';

export const INITIAL_STATE: ConsignmentAddingState = {
  status: 'INIT',
};

export const ConsignmentAddingStore = createStore<
  ConsignmentAddingState,
  typeof ConsignmentAddingActions
>({
  initialState: Object.assign({}, INITIAL_STATE),
  actions: ConsignmentAddingActions,
  name: 'ConsignmentAddingStore',
});

export const useConsignmentAdding = createHook(ConsignmentAddingStore);
