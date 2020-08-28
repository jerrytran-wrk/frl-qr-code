import React from 'react';
import {StyleSheet} from 'react-native';

import Ripple from 'react-native-material-ripple';

import {LightTheme} from '@resources';

export interface FloatingButtonProps {
  onPress?: () => void;
}

export const FloatingButton: React.FC<FloatingButtonProps> = (props) => {
  return (
    <Ripple
      onPress={props.onPress}
      rippleContainerBorderRadius={30}
      style={StyleSheet.flatten([styles.container])}>
      {props.children}
    </Ripple>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    right: 16,
    bottom: 32,
    backgroundColor: LightTheme.colorScheme.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
