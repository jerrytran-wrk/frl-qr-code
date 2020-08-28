import {Distributor} from '@data';
import {StoreActionApi} from 'react-sweet-state';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

import {AuthorizedStoryboardParamList} from '@storyboards';

export type DistributorListState = {
  isLoading: boolean;
  distributors: Distributor[];
  keyword: string;
};
export type DistributorListStoreApi = StoreActionApi<DistributorListState>;

export type DistributorListNavigationProps = StackNavigationProp<
  AuthorizedStoryboardParamList,
  'DistributorList'
>;

export type DistributorListRouteProp = RouteProp<
  AuthorizedStoryboardParamList,
  'DistributorList'
>;

export type DistributorListProps = {
  navigation: DistributorListNavigationProps;
  route: DistributorListRouteProp;
};
