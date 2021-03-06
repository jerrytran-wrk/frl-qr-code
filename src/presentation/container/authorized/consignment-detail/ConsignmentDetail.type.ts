import {StoreActionApi} from 'react-sweet-state';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {Consignment} from '@data';

import {AuthorizedStoryboardParamList} from '@storyboards';

export type ConsignmentDetailState = {
  isLoading: boolean;
  consignment?: Consignment;
  saveQRError?: string;
  shareQRError?: string;
  qrCode?: string;
  title?: string;
  distributorName?: string;
  distributorPhone?: string;
  distributorAddress?: string;
  consignmentName?: string;
  deliveryDate?: string;
  shipperName?: string;
};
export type ConsignmentDetailStoreApi = StoreActionApi<ConsignmentDetailState>;

export type ConsignmentDetailNavigationProps = StackNavigationProp<
  AuthorizedStoryboardParamList,
  'ConsignmentDetail'
>;

export type ConsignmentDetailRouteProp = RouteProp<
  AuthorizedStoryboardParamList,
  'ConsignmentDetail'
>;

export type ConsignmentDetailProps = {
  navigation: ConsignmentDetailNavigationProps;
  route: ConsignmentDetailRouteProp;
};
