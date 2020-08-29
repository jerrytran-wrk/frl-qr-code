import React from 'react';
import {ToastAndroid} from 'react-native';
// import from library section
import {Header, Icon} from 'react-native-elements';
import {
  RNCamera,
  // BarCodeReadEvent,
  GoogleVisionBarcodesDetectedEvent,
} from 'react-native-camera';
// importing from alias section
import {ErrorBoundary, TextView, FullScreenLoadingIndicator} from '@components';
import {LightTheme} from '@resources';

// importing from local file
import {useScanQR} from './ScanQR.store';
import {ScanQRProps} from './ScanQR.type';
import {ScanQRStyles} from './ScanQR.style';

export const ScanQR: React.FC<ScanQRProps> = (props) => {
  const {colorScheme} = LightTheme;
  const [state, action] = useScanQR();
  const {navigation} = props;

  const title = React.useMemo(() => 'Quét mã', []);

  const goBack = React.useCallback(() => {
    navigation.pop();
  }, [navigation]);

  const onGoogleVisionBarcodesDetected = React.useCallback(
    async ({barcodes}: GoogleVisionBarcodesDetectedEvent) => {
      const [code] = barcodes;
      if (state.isValidatingCode) {
        return;
      }
      if (code.type !== RNCamera.Constants.BarCodeType.qr) {
        return;
      }
      const isValid = await action.validate(code.data);
      if (isValid) {
        return navigation.navigate('ConsignmentDetail', {
          consignmentId: code.data,
        });
      }
      ToastAndroid.show(
        'Mã QR không hợp lệ hoặc không tồn tại trong hệ thống!',
        ToastAndroid.LONG,
      );
    },
    [action, navigation, state.isValidatingCode],
  );

  // const onBarCodeRead = React.useCallback(
  //   async (code: BarCodeReadEvent) => {
  //     if (state.isValidatingCode) {
  //       return;
  //     }
  //     if (code.type !== RNCamera.Constants.BarCodeType.qr) {
  //       return;
  //     }
  //     const isValid = await action.validate(code.data);
  //     if (isValid) {
  //       return navigation.navigate('ConsignmentDetail', {
  //         consignmentId: code.data,
  //       });
  //     }
  //     ToastAndroid.show(
  //       'Mã QR không hợp lệ hoặc không tồn tại trong hệ thống!',
  //       ToastAndroid.LONG,
  //     );
  //   },
  //   [action, navigation, state.isValidatingCode],
  // );
  return (
    <ErrorBoundary>
      <FullScreenLoadingIndicator visible={state.isValidatingCode} />
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
        barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        // onBarCodeRead={onBarCodeRead}
        onGoogleVisionBarcodesDetected={onGoogleVisionBarcodesDetected}
      />
    </ErrorBoundary>
  );
};
