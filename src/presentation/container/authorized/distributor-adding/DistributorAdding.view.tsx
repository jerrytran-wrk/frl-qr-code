import React from 'react';
import {View, Alert} from 'react-native';
// import from library section
import {Icon, Header} from 'react-native-elements';
// importing from alias section
import {
  ErrorBoundary,
  TextField,
  RoundedButton,
  TextView,
  FullScreenLoadingIndicator,
} from '@components';
import {LightTheme} from '@resources';
// importing from local file
import {useDistributorAdding} from './DistributorAdding.store';
import {DistributorAddingProps} from './DistributorAdding.type';
import {DistributorAddingStyles} from './DistributorAdding.style';

export const DistributorAdding: React.FC<DistributorAddingProps> = (props) => {
  const {colorScheme} = LightTheme;
  const [state, action] = useDistributorAdding();
  const {navigation} = props;

  const title = React.useMemo(() => 'Thêm nhà phân phối', []);
  const namePlaceholder = React.useMemo(() => 'Tên nhà Phân phối', []);
  const phonePlaceholder = React.useMemo(() => 'Số điện thoại', []);
  const addressPlaceholder = React.useMemo(() => 'Địa chỉ', []);

  const [name, setName] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [phone, setPhone] = React.useState('');

  const goBack = React.useCallback(() => {
    navigation.pop();
  }, [navigation]);

  const onSaveButtonPress = React.useCallback(async () => {
    const success = await action.add(name, address, phone);
    if (success) {
      goBack();
      return Alert.alert('Thành công', 'Tạo nhà phân phối thành công!');
    }
    Alert.alert('Thất bại', 'Tạo nhà phân phối không thành công!');
  }, [action, address, goBack, name, phone]);

  const renderForm = React.useCallback(() => {
    return (
      <>
        <View style={DistributorAddingStyles.form}>
          <TextField
            containerStyle={DistributorAddingStyles.formComponentDistance}
            prefix={<Icon name="albums-outline" type="ionicon" />}
            inputProps={{
              placeholder: namePlaceholder,
              onChangeText: setName,
            }}
          />
          <TextField
            containerStyle={DistributorAddingStyles.formComponentDistance}
            prefix={<Icon name="reader-outline" type="ionicon" />}
            inputProps={{
              placeholder: addressPlaceholder,
              onChangeText: setAddress,
            }}
          />
          <TextField
            containerStyle={DistributorAddingStyles.formComponentDistance}
            prefix={<Icon name="call-outline" type="ionicon" />}
            inputProps={{
              placeholder: phonePlaceholder,
              keyboardType: 'phone-pad',
              onChangeText: setPhone,
            }}
          />
        </View>
        <RoundedButton
          containerStyle={DistributorAddingStyles.saveButton}
          title="Lưu lại"
          onPress={onSaveButtonPress}
        />
      </>
    );
  }, [
    addressPlaceholder,
    namePlaceholder,
    onSaveButtonPress,
    phonePlaceholder,
  ]);

  return (
    <ErrorBoundary>
      <FullScreenLoadingIndicator visible={state.isAdding} />
      <Header
        statusBarProps={{
          translucent: true,
          backgroundColor: 'transparent',
          barStyle: 'dark-content',
        }}
        backgroundColor={colorScheme.primary}
        centerComponent={
          <TextView text={title} style={DistributorAddingStyles.title} />
        }
        rightComponent={<Icon name="save-outline" type="ionicon" />}
        leftComponent={
          <Icon name="arrow-back-outline" type="ionicon" onPress={goBack} />
        }
      />
      <View style={DistributorAddingStyles.container}>{renderForm()}</View>
    </ErrorBoundary>
  );
};
