import * as React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import {AuthenticationStoryboardParamList} from '@storyboards';
import {SignIn} from '@containers';

const Stack = createStackNavigator<AuthenticationStoryboardParamList>();

export const AuthenticationNavigator: React.FC = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="SignIn" component={SignIn} />
    </Stack.Navigator>
  );
};
