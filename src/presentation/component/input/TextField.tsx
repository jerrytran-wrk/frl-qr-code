import React from 'react';
import {
  View,
  Image,
  ImageSourcePropType,
  TextInputProps,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {LightTheme} from '@resources';

export interface TextFieldProps {
  containerStyle?: StyleProp<ViewStyle>;
  prefix?: React.ReactNode;
  prefixIcon?: ImageSourcePropType;
  suffixIcon?: ImageSourcePropType;
  inputProps?: TextInputProps;
}

export const TextField: React.FC<TextFieldProps> = (props) => {
  const {
    containerStyle,
    prefixIcon,
    suffixIcon,
    inputProps = {},
    prefix,
  } = props;

  const renderPrefix = () => {
    if (prefix) {
      return prefix;
    }
    if (prefixIcon) {
      return <Image source={prefixIcon} />;
    }
    return null;
  };

  const renderSuffix = () => {
    if (suffixIcon) {
      return <Image source={suffixIcon} />;
    }
    return null;
  };

  return (
    <View style={[_styles.container, containerStyle]}>
      <View style={_styles.content}>
        {renderPrefix()}
        <View style={_styles.padding} />
        <TextInput {...inputProps} style={[_styles.input, inputProps.style]} />
        {renderSuffix()}
      </View>
    </View>
  );
};

const _styles = StyleSheet.create({
  container: {},
  content: {
    flexDirection: 'row',
    borderColor: LightTheme.colorScheme.secondary,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  input: {
    flex: 1,
  },
  padding: {width: 16},
});
