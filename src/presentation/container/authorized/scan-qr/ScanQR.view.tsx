import React from 'react';
import {} from 'react-native';
// import from library section
import {Header, Icon} from 'react-native-elements';
import {RNCamera} from 'react-native-camera';
// importing from alias section
import {ErrorBoundary, TextView} from '@components';
import {LightTheme} from '@resources';

// importing from local file
import {useScanQR} from './ScanQR.store';
import {ScanQRProps} from './ScanQR.type';
import {ScanQRStyles} from './ScanQR.style';

export const ScanQR: React.FC<ScanQRProps> = (props) => {
  const {colorScheme} = LightTheme;
  const [state, action] = useScanQR();
  const {navigation} = props;

  const title = React.useMemo(() => 'Scan Lô hàng', []);

  const goBack = React.useCallback(() => {
    navigation.pop();
  }, [navigation]);

  return (
    <ErrorBoundary>
      <Header
        statusBarProps={{
          translucent: true,
          backgroundColor: 'transparent',
          barStyle: 'dark-content',
        }}
        backgroundColor={colorScheme.primary}
        centerComponent={<TextView text={title} style={ScanQRStyles.title} />}
        leftComponent={
          <Icon name="arrow-back-outline" type="ionicon" onPress={goBack} />
        }
      />
      <RNCamera
        style={ScanQRStyles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        androidRecordAudioPermissionOptions={{
          title: 'Permission to use audio recording',
          message: 'We need your permission to use your audio',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        onGoogleVisionBarcodesDetected={({barcodes}) => {
          console.log(barcodes);
        }}
      />
    </ErrorBoundary>
  );
};
