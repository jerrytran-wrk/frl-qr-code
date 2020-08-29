import {StoreActionApi} from 'react-sweet-state';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

import {AuthorizedStoryboardParamList} from '@storyboards';
import {KeyValuePair} from '@components';
import {Consignment, ConsignmentEditingData} from '@data';

export type ConsignmentEditingState = {
  isEditing: boolean;
  editingError?: string;
  isLoadingDistributor: boolean;
  distributorSelections: KeyValuePair[];
  isLoadingConsignment: boolean;
  consignment?: Consignment;
  editingData: ConsignmentEditingData;
};
export type ConsignmentEditingStoreApi = StoreActionApi<
  ConsignmentEditingState
>;

export type ConsignmentEditingNavigationProps = StackNavigationProp<
  AuthorizedStoryboardParamList,
  'ConsignmentEditing'
>;

export type ConsignmentEditingRouteProp = RouteProp<
  AuthorizedStoryboardParamList,
  'ConsignmentEditing'
>;

export type ConsignmentEditingProps = {
  navigation: ConsignmentEditingNavigationProps;
  route: ConsignmentEditingRouteProp;
};
