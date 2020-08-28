import {StyleSheet} from 'react-native';
import {LightTheme} from '@resources';

export const SignInStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: LightTheme.colorScheme.background,
    justifyContent: 'space-around',
  },
  logo: {
    height: '30%',
    alignSelf: 'center',
  },
  marginTop: {
    marginTop: 8,
  },
  copyright: {
    alignSelf: 'center',
    color: LightTheme.colorScheme.secondary,
  },
});
