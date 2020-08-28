import {createStore, createHook} from 'react-sweet-state';
import {DistributorListActions} from './DistributorList.action';
import {DistributorListState} from './DistributorList.type';

export const INITIAL_STATE: DistributorListState = {
  status: 'INIT',
};

export const DistributorListStore = createStore<
  DistributorListState,
  typeof DistributorListActions
>({
  initialState: Object.assign({}, INITIAL_STATE),
  actions: DistributorListActions,
  name: 'DistributorListStore',
});

export const useDistributorList = createHook(DistributorListStore);
