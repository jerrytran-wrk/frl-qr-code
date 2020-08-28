import {createStore, createHook} from 'react-sweet-state';
import {DistributorListActions} from './DistributorList.action';
import {DistributorListState} from './DistributorList.type';
import {INITIAL_STATE} from './constants';

export const DistributorListStore = createStore<
  DistributorListState,
  typeof DistributorListActions
>({
  initialState: Object.assign({}, INITIAL_STATE),
  actions: DistributorListActions,
  name: 'DistributorListStore',
});

export const useDistributorList = createHook(DistributorListStore);
