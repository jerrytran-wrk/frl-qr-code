import {StyleSheet} from 'react-native';
import {LightTheme} from '@resources';

export const ConsignmentEditingStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LightTheme.colorScheme.background,
    padding: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  form: {
    flex: 1,
  },
  formComponentDistance: {
    marginTop: 16,
  },
  saveButton: {},
});
