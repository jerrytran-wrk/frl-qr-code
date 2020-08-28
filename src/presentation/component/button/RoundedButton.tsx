import React from 'react';
import {StyleSheet, Text, TextProps, StyleProp, ViewStyle} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Ripple from 'react-native-material-ripple';
import {LightTheme} from '@resources';

export interface RoundedButtonProps extends TextProps {
  containerStyle?: StyleProp<ViewStyle>;
  title: string;
  onPress?: () => void;
}

const _RoundedButton: React.FC<RoundedButtonProps> = (props) => {
  const {colorScheme} = LightTheme;
  const {title, onPress} = props;
  return (
    <Ripple
      onPress={onPress}
      style={StyleSheet.flatten([_styles.container, props.containerStyle])}>
      <LinearGradient
        colors={[colorScheme.secondary, colorScheme.secondary]}
        style={_styles.linear}>
        <Text style={_styles.title}>{title}</Text>
      </LinearGradient>
    </Ripple>
  );
};

const _styles = StyleSheet.create({
  container: {
    height: 44,
  },
  linear: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export const RoundedButton = React.memo(_RoundedButton);
