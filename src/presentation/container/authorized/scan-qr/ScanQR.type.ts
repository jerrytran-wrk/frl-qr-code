import {StoreActionApi} from 'react-sweet-state';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

import {ParamsType} from '@storyboards';

export type ScanQRState = {};
export type ScanQRStoreApi = StoreActionApi<ScanQRState>;

export type ScanQRNavigationProps = StackNavigationProp<ParamsType, 'ScanQR'>;

export type ScanQRRouteProp = RouteProp<ParamsType, 'ScanQR'>;

export type ScanQRProps = {
  navigation: ScanQRNavigationProps;
  route: ScanQRRouteProp;
};
