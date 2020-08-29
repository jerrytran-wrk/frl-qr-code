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
import {useDistributorEditing} from './DistributorEditing.store';
import {DistributorEditingProps} from './DistributorEditing.type';
import {DistributorEditingStyles} from './DistributorEditing.style';

export const DistributorEditing: React.FC<DistributorEditingProps> = (
  props,
) => {
  const {colorScheme} = LightTheme;
  const [state, action] = useDistributorEditing();
  const {navigation, route} = props;

  React.useEffect(() => {
    action.loadDistributor(route.params.distributorId);
    return action.reset;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {editingData, isEditing, isLoadingDistributor, editingError} = state;

  const title = React.useMemo(() => 'Thêm nhà phân phối', []);
  const namePlaceholder = React.useMemo(() => 'Tên nhà Phân phối', []);
  const phonePlaceholder = React.useMemo(() => 'Số điện thoại', []);
  const addressPlaceholder = React.useMemo(() => 'Địa chỉ', []);

  const goBack = React.useCallback(() => {
    navigation.pop();
  }, [navigation]);

  const onSaveButtonPress = React.useCallback(async () => {
    await action.edit();
    if (!editingError) {
      goBack();
      return Alert.alert('Thành công', 'Sửa nhà phân phối không thành công!');
    }
    Alert.alert('Thất bại', editingError);
  }, [action, editingError, goBack]);

  const renderForm = () => {
    return (
      <>
        <View style={DistributorEditingStyles.form}>
          <TextField
            containerStyle={DistributorEditingStyles.formComponentDistance}
            prefix={<Icon name="albums-outline" type="ionicon" />}
            inputProps={{
              placeholder: namePlaceholder,
              onChangeText: (name) => action.setEditingData({name}),
              value: editingData.name,
            }}
          />
          <TextField
            containerStyle={DistributorEditingStyles.formComponentDistance}
            prefix={<Icon name="reader-outline" type="ionicon" />}
            inputProps={{
              placeholder: addressPlaceholder,
              onChangeText: (address) => action.setEditingData({address}),
              value: editingData.address,
            }}
          />
          <TextField
            containerStyle={DistributorEditingStyles.formComponentDistance}
            prefix={<Icon name="call-outline" type="ionicon" />}
            inputProps={{
              placeholder: phonePlaceholder,
              keyboardType: 'phone-pad',
              onChangeText: (phone) => action.setEditingData({phone}),
              value: editingData.phone,
            }}
          />
        </View>
        <RoundedButton
          containerStyle={DistributorEditingStyles.saveButton}
          title="Lưu lại"
          onPress={onSaveButtonPress}
        />
      </>
    );
  };

  return (
    <ErrorBoundary>
      <FullScreenLoadingIndicator visible={isEditing || isLoadingDistributor} />
      <Header
        statusBarProps={{
          translucent: true,
          backgroundColor: 'transparent',
          barStyle: 'dark-content',
        }}
        backgroundColor={colorScheme.primary}
        centerComponent={
          <TextView text={title} style={DistributorEditingStyles.title} />
        }
        rightComponent={<Icon name="save-outline" type="ionicon" />}
        leftComponent={
          <Icon name="arrow-back-outline" type="ionicon" onPress={goBack} />
        }
      />
      <View style={DistributorEditingStyles.container}>{renderForm()}</View>
    </ErrorBoundary>
  );
};
