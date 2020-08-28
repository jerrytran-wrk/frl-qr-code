import {createStore, createHook} from 'react-sweet-state';
import { ConsignmentListActions} from './ConsignmentList.action';
import { ConsignmentListState} from './ConsignmentList.type';

export const INITIAL_STATE: ConsignmentListState = {
  status: 'INIT',
};

export const ConsignmentListStore = createStore<ConsignmentListState, typeof ConsignmentListActions>({
  initialState: Object.assign({}, INITIAL_STATE),
  actions: ConsignmentListActions,
  name: 'ConsignmentListStore',
});

export const useConsignmentList = createHook(ConsignmentListStore);
