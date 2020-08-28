import {createStore, createHook} from 'react-sweet-state';
import {ConsignmentDetailActions} from './ConsignmentDetail.action';
import {ConsignmentDetailState} from './ConsignmentDetail.type';
import {INITIAL_STATE} from './constants';

export const ConsignmentDetailStore = createStore<
  ConsignmentDetailState,
  typeof ConsignmentDetailActions
>({
  initialState: Object.assign({}, INITIAL_STATE),
  actions: ConsignmentDetailActions,
  name: 'ConsignmentDetailStore',
});

export const useConsignmentDetail = createHook(ConsignmentDetailStore);
