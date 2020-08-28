import * as React from 'react';
import {} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {AuthenticationNavigator} from './AuthenticationStack';

import {NavigatorContext} from '../context';

import {AuthorizedNavigator} from './AuthorizedStack';

export const RootNavigator: React.FC = () => {
  const [isAuthorized, setIsAuthorized] = React.useState(false);
  const renderStack = () => {
    if (isAuthorized) {
      return <AuthorizedNavigator />;
    }
    return <AuthenticationNavigator />;
  };
  return (
    <NavigatorContext.Provider value={{setIsAuthorized}}>
      <NavigationContainer>{renderStack()}</NavigationContainer>
    </NavigatorContext.Provider>
  );
};
