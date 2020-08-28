import {StoreActionApi} from 'react-sweet-state';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

import {AuthorizedStoryboardParamList} from '@storyboards';
import {KeyValuePair} from '@components';

export type ConsignmentAddingState = {
  isAdding: boolean;
  isLoadDistributor: boolean;
  distributors: KeyValuePair[];
};
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

export type ConsignmentAddingData = {
  name: string;
  shipper: string;
  distributorId: string;
  createdDate: Date;
};
