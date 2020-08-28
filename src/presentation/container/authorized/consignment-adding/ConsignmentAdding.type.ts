import {StoreActionApi} from 'react-sweet-state';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

import {AuthorizedStoryboardParamList} from '@storyboards';

export type ConsignmentAddingState = {};
export type ConsignmentAddingStoreApi = StoreActionApi<ConsignmentAddingState>;

export type ConsignmentAddingNavigationProps = StackNavigationProp<
  AuthorizedStoryboardParamList,
  'ConsignmentAdding'
>;

export type ConsignmentAddingRouteProp = RouteProp<
  AuthorizedStoryboardParamList,
  'ConsignmentAdding'
>;

export type ConsignmentAddingProps = {
  navigation: ConsignmentAddingNavigationProps;
  route: ConsignmentAddingRouteProp;
};
