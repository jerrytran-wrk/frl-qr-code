import {StoreActionApi} from 'react-sweet-state';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

import {AuthorizedStoryboardParamList} from '@storyboards';
import {Distributor, DistributorEditingData} from '@data';

export type DistributorEditingState = {
  isEditing: boolean;
  editingError?: string;
  isLoadingDistributor: boolean;
  distributor?: Distributor;
  editingData: DistributorEditingData;
};
export type DistributorEditingStoreApi = StoreActionApi<
  DistributorEditingState
>;

export type DistributorEditingNavigationProps = StackNavigationProp<
  AuthorizedStoryboardParamList,
  'DistributorEditing'
>;

export type DistributorEditingRouteProp = RouteProp<
  AuthorizedStoryboardParamList,
  'DistributorEditing'
>;

export type DistributorEditingProps = {
  navigation: DistributorEditingNavigationProps;
  route: DistributorEditingRouteProp;
};
