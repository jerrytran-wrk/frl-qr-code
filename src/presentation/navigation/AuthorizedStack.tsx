import * as React from 'react';

import {enableScreens} from 'react-native-screens';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';

import {AuthorizedStoryboardParamList} from '@storyboards';
import {DistributorList, ConsignmentList, ConsignmentAdding} from '@containers';

enableScreens();
const Stack = createNativeStackNavigator<AuthorizedStoryboardParamList>();

export const AuthorizedNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="DistributorList" component={DistributorList} />
      <Stack.Screen name="ConsignmentList" component={ConsignmentList} />
      <Stack.Screen name="ConsignmentAdding" component={ConsignmentAdding} />
    </Stack.Navigator>
  );
};
