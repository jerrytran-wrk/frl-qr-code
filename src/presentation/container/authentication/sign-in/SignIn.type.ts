import {StoreActionApi} from 'react-sweet-state';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

import {AuthenticationStoryboardParamList} from '@storyboards';

export type SignInState = {isSigning: boolean};
export type SignInStoreApi = StoreActionApi<SignInState>;

export type SignInNavigationProps = StackNavigationProp<
  AuthenticationStoryboardParamList,
  'SignIn'
>;

export type SignInRouteProp = RouteProp<
  AuthenticationStoryboardParamList,
  'SignIn'
>;

export type SignInProps = {
  navigation: SignInNavigationProps;
  route: SignInRouteProp;
};
