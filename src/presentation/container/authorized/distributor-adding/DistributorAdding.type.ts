import {StoreActionApi} from 'react-sweet-state';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

import {AuthorizedStoryboardParamList} from '@storyboards';

export type DistributorAddingState = {};
export type DistributorAddingStoreApi = StoreActionApi<DistributorAddingState>;

export type DistributorAddingNavigationProps = StackNavigationProp<
  AuthorizedStoryboardParamList,
  'DistributorAdding'
>;

export type DistributorAddingRouteProp = RouteProp<
  AuthorizedStoryboardParamList,
  'DistributorAdding'
>;

export type DistributorAddingProps = {
  navigation: DistributorAddingNavigationProps;
  route: DistributorAddingRouteProp;
};
