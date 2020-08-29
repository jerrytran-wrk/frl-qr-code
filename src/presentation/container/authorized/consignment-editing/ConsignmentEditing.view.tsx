import React from 'react';
import {View, ScrollView, Alert} from 'react-native';
// import from library section
import {Header, Icon} from 'react-native-elements';

// importing from alias section
import {
  ErrorBoundary,
  TextView,
  TextField,
  RoundedButton,
  DatePicker,
  ValuePicker,
  FullScreenLoadingIndicator,
} from '@components';
import {LightTheme} from '@resources';
// importing from local file
import {useConsignmentEditing} from './ConsignmentEditing.store';
import {ConsignmentEditingProps} from './ConsignmentEditing.type';
import {ConsignmentEditingStyles} from './ConsignmentEditing.style';

export const ConsignmentEditing: React.FC<ConsignmentEditingProps> = (
  props,
) => {
  const {colorScheme} = LightTheme;
  const [state, action] = useConsignmentEditing();
  const {navigation, route} = props;
  const {
    distributorSelections,
    editingData,
    editingError,
    isEditing,
    isLoadingDistributor,
    isLoadingConsignment,
    consignment,
  } = state;
  React.useEffect(() => {
    action.loadConsignment(route.params.consignmentId);
    action.loadDistributor();
    return () => action.reset();
  }, [action, route.params.consignmentId]);

  const title = React.useMemo(() => 'Sửa Lô hàng', []);
  const shipperPlaceholder = React.useMemo(() => 'Người giao hàng', []);
  const consignmentPlaceholder = React.useMemo(() => 'Lô Hàng', []);

  const onSaveButtonPress = React.useCallback(async () => {
    await action.edit();
    if (!editingError) {
      return navigation.replace('ConsignmentDetail', {
        consignmentId: consignment!.id,
      });
    }
    Alert.alert('Thất bại', 'Sửa lô hàng thất bại!');
  }, [action, consignment, editingError, navigation]);

  const goBack = React.useCallback(() => {
    navigation.pop();
  }, [navigation]);

  const renderForm = () => {
    return (
      <>
        <View style={ConsignmentEditingStyles.form}>
          <ValuePicker
            containerStyle={ConsignmentEditingStyles.formComponentDistance}
            prefix={<Icon name="albums-outline" type="ionicon" />}
            data={distributorSelections}
            title="Nhà phân phối"
            onChangeValue={(distributorId) =>
              action.setEditingData({distributorId})
            }
            selectedId={editingData.distributorId}
            isLoadData={isLoadingDistributor}
          />
          <TextField
            containerStyle={ConsignmentEditingStyles.formComponentDistance}
            prefix={<Icon name="cube-outline" type="ionicon" />}
            inputProps={{
              placeholder: consignmentPlaceholder,
              onChangeText: (name) => action.setEditingData({name}),
              value: editingData.name,
            }}
          />
          <TextField
            containerStyle={ConsignmentEditingStyles.formComponentDistance}
            prefix={<Icon name="shirt-outline" type="ionicon" />}
            inputProps={{
              placeholder: shipperPlaceholder,
              onChangeText: (shipper) => action.setEditingData({shipper}),
              value: editingData.shipper,
            }}
          />
          {editingData?.createdDate && (
            <DatePicker
              containerStyle={ConsignmentEditingStyles.formComponentDistance}
              defaultValue={new Date(editingData.createdDate)}
              onChangeValue={(date) =>
                action.setEditingData({createdDate: date.toISOString()})
              }
            />
          )}
        </View>
        <RoundedButton
          containerStyle={ConsignmentEditingStyles.saveButton}
          title="Lưu lại"
          onPress={onSaveButtonPress}
        />
      </>
    );
  };

  return (
    <ErrorBoundary>
      <FullScreenLoadingIndicator visible={isEditing || isLoadingConsignment} />
      <Header
        statusBarProps={{
          translucent: true,
          backgroundColor: 'transparent',
          barStyle: 'dark-content',
        }}
        backgroundColor={colorScheme.primary}
        centerComponent={
          <TextView text={title} style={ConsignmentEditingStyles.title} />
        }
        rightComponent={<Icon name="save-outline" type="ionicon" />}
        leftComponent={
          <Icon name="arrow-back-outline" type="ionicon" onPress={goBack} />
        }
      />
      <ScrollView contentContainerStyle={ConsignmentEditingStyles.container}>
        {renderForm()}
      </ScrollView>
    </ErrorBoundary>
  );
};
