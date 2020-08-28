import React from 'react';
import {
  InteractionManager,
  View,
  ActivityIndicator,
  Dimensions,
  PermissionsAndroid,
} from 'react-native';
// import from library section
import {useFocusEffect} from '@react-navigation/native';
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

  React.useEffect(() => {
    return action.reset;
  }, [action.reset]);

  useFocusEffect(
    React.useCallback(() => {
      const task = InteractionManager.runAfterInteractions(() => {
        if (navigation.isFocused()) {
          return action.load(route.params.consignmentId);
        }
        action.reset();
      });

      return () => task.cancel();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  const title = React.useMemo(() => state.consignment?.name, [state]);

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
        reject();
      }
      //@ts-ignore
      qrCodeRef.current!.toDataURL(async (data: string) => {
        await action.save(data, state.consignment!);
        resolve();
      });
    });
  }, [action, hasAndroidPermission, state]);

  const onSaveButtonPress = React.useCallback(() => saveQR(), [saveQR]);

  const onShareButtonPress = React.useCallback(async () => {
    await saveQR();
    action.share(state.consignment!);
  }, [action, saveQR, state.consignment]);

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
        <View style={ConsignmentDetailStyles.information}>
          <KeyValueText
            containerStyle={ConsignmentDetailStyles.informationRowPadding}
            prefix={<Icon name="save-outline" type="ionicon" />}
            title="Tên lô hàng: "
            value={state.consignment?.name}
          />
          <KeyValueText
            containerStyle={ConsignmentDetailStyles.informationRowPadding}
            prefix={<Icon name="save-outline" type="ionicon" />}
            title="Tên nhà phân phối: "
            value={state.consignment?.distributor?.name}
          />
          <KeyValueText
            containerStyle={ConsignmentDetailStyles.informationRowPadding}
            prefix={<Icon name="save-outline" type="ionicon" />}
            title="Người giao hàng: "
            value={state.consignment?.shipper}
          />
          <KeyValueText
            containerStyle={ConsignmentDetailStyles.informationRowPadding}
            prefix={<Icon name="save-outline" type="ionicon" />}
            title="Ngày sản xuất: "
            value={state.consignment?.createdDate.toString()}
          />
        </View>
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
          value={route.params.consignmentId}
          size={Dimensions.get('window').width * 0.6}
        />
      </View>
      {renderContent()}
    </ErrorBoundary>
  );
};
