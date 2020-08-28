import {StyleSheet} from 'react-native';
import {LightTheme} from '@resources';

export const ConsignmentListStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LightTheme.colorScheme.background,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  list: {
    paddingHorizontal: 8,
  },
});
