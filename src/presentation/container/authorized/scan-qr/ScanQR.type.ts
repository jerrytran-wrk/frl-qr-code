import {StoreActionApi} from 'react-sweet-state';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

import {AuthorizedStoryboardParamList} from '@storyboards';

export type ScanQRState = {
  isValidatingCode: boolean;
};
export type ScanQRStoreApi = StoreActionApi<ScanQRState>;

export type ScanQRNavigationProps = StackNavigationProp<
  AuthorizedStoryboardParamList,
  'ScanQR'
>;

export type ScanQRRouteProp = RouteProp<
  AuthorizedStoryboardParamList,
  'ScanQR'
>;

export type ScanQRProps = {
  navigation: ScanQRNavigationProps;
  route: ScanQRRouteProp;
};
