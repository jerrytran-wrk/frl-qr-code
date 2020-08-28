import {LightTheme} from '@resources';
import {StyleSheet} from 'react-native';

export const ConsignmentDetailStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  actionContainer: {
    flexDirection: 'row',
  },
  qrCodeContainer: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  padding: {
    width: 20,
  },
  information: {
    backgroundColor: LightTheme.colorScheme.background,
    borderRadius: 8,
    margin: 16,
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  informationRowPadding: {
    marginVertical: 8,
  },
});
