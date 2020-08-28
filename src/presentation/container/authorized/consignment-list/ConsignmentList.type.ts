import {StoreActionApi} from 'react-sweet-state';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

import {AuthorizedStoryboardParamList} from '@storyboards';

export type ConsignmentListState = {};
export type ConsignmentListStoreApi = StoreActionApi<ConsignmentListState>;

export type ConsignmentListNavigationProps = StackNavigationProp<
  AuthorizedStoryboardParamList,
  'ConsignmentList'
>;

export type ConsignmentListRouteProp = RouteProp<
  AuthorizedStoryboardParamList,
  'ConsignmentList'
>;

export type ConsignmentListProps = {
  navigation: ConsignmentListNavigationProps;
  route: ConsignmentListRouteProp;
};
