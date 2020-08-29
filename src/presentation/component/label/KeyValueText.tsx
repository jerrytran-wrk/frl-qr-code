import React from 'react';
import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import {TextView} from './TextView';
import {LightTheme} from '@resources';

export type KeyValueTextProps = {
  title?: string;
  value?: string;
  containerStyle?: StyleProp<ViewStyle>;
  prefix?: React.ReactNode;
};

export const KeyValueText: React.FC<KeyValueTextProps> = (props) => {
  return (
    <View style={[styles.container, props.containerStyle]}>
      {props.prefix && (
        <View style={styles.prefixContainer}>{props.prefix}</View>
      )}
      <TextView style={styles.title} text={props.title} />
      <TextView style={styles.value} text={props.value} />
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  prefixContainer: {
    width: 40,
  },
  title: {
    fontWeight: '700',
  },
  value: {
    flex: 1,
    marginLeft: 2,
    color: LightTheme.colorScheme.secondary,
  },
});
