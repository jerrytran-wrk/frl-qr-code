import * as React from 'react';

import {enableScreens} from 'react-native-screens';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';

import {AuthenticationStoryboardParamList} from '@storyboards';
import {SignIn, ScanQR, ConsignmentDetail} from '@containers';

enableScreens();
const Stack = createNativeStackNavigator<AuthenticationStoryboardParamList>();

export const AuthenticationNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="ScanQR" component={ScanQR} />
      <Stack.Screen name="ConsignmentDetail" component={ConsignmentDetail} />
    </Stack.Navigator>
  );
};
