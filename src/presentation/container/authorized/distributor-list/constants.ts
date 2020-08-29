import {DistributorListState} from './DistributorList.type';
export const INITIAL_STATE: DistributorListState = {
  distributors: [],
  isLoading: false,
  keyword: '',
  isSigningOut: false,
};
