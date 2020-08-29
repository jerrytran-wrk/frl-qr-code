/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {RootNavigator} from '@presentation';
import codePush from 'react-native-code-push';

const App = () => {
  return (
    <>
      <RootNavigator />
    </>
  );
};

export default codePush(App);
