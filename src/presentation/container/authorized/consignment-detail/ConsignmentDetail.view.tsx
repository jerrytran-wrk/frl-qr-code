import React from 'react';
import {
  View,
  ActivityIndicator,
  Dimensions,
  PermissionsAndroid,
  ScrollView,
  Alert,
} from 'react-native';
// import from library section
import QRCode from 'react-native-qrcode-svg';
import {Icon, Header} from 'react-native-elements';
import Svg from 'react-native-svg';
// importing from alias section
import {ErrorBoundary, TextView, KeyValueText} from '@components';

// importing from local file
import {useConsignmentDetail} from './ConsignmentDetail.store';
import {ConsignmentDetailProps} from './ConsignmentDetail.type';
import {ConsignmentDetailStyles} from './ConsignmentDetail.style';
import {LightTheme} from '@resources';

export const ConsignmentDetail: React.FC<ConsignmentDetailProps> = (props) => {
  const {colorScheme} = LightTheme;
  const [state, action] = useConsignmentDetail();
  const {navigation, route} = props;

  const {
    title,
    consignmentName,
    distributorName,
    shipperName,
    deliveryDate,
    qrCode,
    distributorAddress,
    distributorPhone,
  } = state;

  React.useEffect(() => {
    action.set(route.params.consignment);
    return action.reset;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const qrCodeRef = React.useRef<Svg>(null);

  const goBack = React.useCallback(() => {
    navigation.pop();
  }, [navigation]);

  const hasAndroidPermission = React.useCallback(async () => {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  }, []);

  const saveQR = React.useCallback(() => {
    return new Promise(async (resolve, reject) => {
      const granted = await hasAndroidPermission();
      if (!granted) {
        Alert.alert('Permission denied', 'Không có quyền truy cập bộ nhớ!');
        reject();
        return;
      }
      //@ts-ignore
      qrCodeRef.current!.toDataURL(async (data: string) => {
        await action.save(data, state.consignment!);
        resolve();
      });
    });
  }, [action, hasAndroidPermission, state]);

  const onSaveButtonPress = React.useCallback(async () => {
    await saveQR();
    if (state.saveQRError) {
      return Alert.alert('Thất bại', 'Lưu mã QR không thành công');
    }
    Alert.alert('Thành công', 'Lưu mã QR thành công');
  }, [saveQR, state.saveQRError]);

  const onShareButtonPress = React.useCallback(async () => {
    await saveQR();
    await action.share(state.consignment!);
    if (state.saveQRError) {
      return Alert.alert('Thất bại', 'Share mã QR không thành công');
    }
    Alert.alert('Thành công', 'Share mã QR thành công');
  }, [action, saveQR, state.consignment, state.saveQRError]);

  const renderContent = () => {
    if (state.isLoading) {
      return (
        <View style={ConsignmentDetailStyles.container}>
          <ActivityIndicator color={LightTheme.colorScheme.secondary} />
        </View>
      );
    }
    return (
      <>
        <ScrollView contentContainerStyle={ConsignmentDetailStyles.information}>
          <KeyValueText
            containerStyle={ConsignmentDetailStyles.informationRowPadding}
            prefix={<Icon name="cube-outline" type="ionicon" />}
            title="Tên lô hàng: "
            value={consignmentName}
          />
          <KeyValueText
            containerStyle={ConsignmentDetailStyles.informationRowPadding}
            prefix={<Icon name="albums-outline" type="ionicon" />}
            title="Tên nhà phân phối: "
            value={distributorName}
          />
          <KeyValueText
            containerStyle={ConsignmentDetailStyles.informationRowPadding}
            prefix={<Icon name="phone-portrait-outline" type="ionicon" />}
            title="Sdt nhà phân phối: "
            value={distributorPhone}
          />

          <KeyValueText
            containerStyle={ConsignmentDetailStyles.informationRowPadding}
            prefix={<Icon name="compass-outline" type="ionicon" />}
            title="Địa chỉ nhà phân phối: "
            value={distributorAddress}
          />

          <KeyValueText
            containerStyle={ConsignmentDetailStyles.informationRowPadding}
            prefix={<Icon name="shirt-outline" type="ionicon" />}
            title="Người giao hàng: "
            value={shipperName}
          />
          <KeyValueText
            containerStyle={ConsignmentDetailStyles.informationRowPadding}
            prefix={<Icon name="calendar-outline" type="ionicon" />}
            title="Ngày giao: "
            value={deliveryDate}
          />
        </ScrollView>
      </>
    );
  };

  return (
    <ErrorBoundary>
      <Header
        statusBarProps={{
          translucent: true,
          backgroundColor: 'transparent',
          barStyle: 'dark-content',
        }}
        backgroundColor={colorScheme.primary}
        centerComponent={
          <TextView text={title} style={ConsignmentDetailStyles.title} />
        }
        leftComponent={
          <Icon name="arrow-back-outline" type="ionicon" onPress={goBack} />
        }
        rightComponent={
          <View style={ConsignmentDetailStyles.actionContainer}>
            <Icon
              name="save-outline"
              type="ionicon"
              onPress={onSaveButtonPress}
            />
            <View style={ConsignmentDetailStyles.padding} />
            <Icon
              name="share-outline"
              type="ionicon"
              onPress={onShareButtonPress}
            />
          </View>
        }
      />
      <View style={ConsignmentDetailStyles.qrCodeContainer}>
        <QRCode
          //@ts-ignore
          getRef={qrCodeRef}
          value={qrCode}
          size={Dimensions.get('window').width * 0.6}
        />
      </View>
      {renderContent()}
    </ErrorBoundary>
  );
};
