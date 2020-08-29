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
// importing from local file
import {useConsignmentAdding} from './ConsignmentAdding.store';
import {ConsignmentAddingProps} from './ConsignmentAdding.type';
import {ConsignmentAddingStyles} from './ConsignmentAdding.style';
import {LightTheme} from '@resources';

export const ConsignmentAdding: React.FC<ConsignmentAddingProps> = (props) => {
  const {colorScheme} = LightTheme;
  const [state, action] = useConsignmentAdding();
  const {navigation, route} = props;

  React.useEffect(() => {
    action.loadDistributor();
    return () => action.reset();
  }, [action]);

  const title = React.useMemo(() => 'Thêm Lô Hàng', []);
  const shipperPlaceholder = React.useMemo(() => 'Người giao hàng', []);
  const consignmentPlaceholder = React.useMemo(() => 'Lô Hàng', []);

  const [distributorId, setDistributorId] = React.useState(
    route.params.distributor.id,
  );
  const [name, setName] = React.useState('');
  const [shipper, setShipper] = React.useState('');
  const [createdDate, setCreatedDate] = React.useState(new Date());

  const onSaveButtonPress = React.useCallback(async () => {
    const consignment = await action.add({
      distributorId,
      name,
      shipper,
      createdDate,
    });
    if (consignment) {
      return navigation.navigate('ConsignmentDetail', {
        consignmentId: consignment.id,
      });
    }
    Alert.alert('Thất bại', 'Tạo lô hàng thất bại!');
  }, [action, createdDate, distributorId, name, navigation, shipper]);

  const goBack = React.useCallback(() => {
    navigation.pop();
  }, [navigation]);

  const renderForm = React.useCallback(() => {
    return (
      <>
        <View style={ConsignmentAddingStyles.form}>
          <ValuePicker
            containerStyle={ConsignmentAddingStyles.formComponentDistance}
            prefix={<Icon name="albums-outline" type="ionicon" />}
            data={state.distributors}
            title="Nhà phân phối"
            onChangeValue={setDistributorId}
            selectedId={distributorId}
            isLoadData={state.isLoadDistributor}
          />
          <TextField
            containerStyle={ConsignmentAddingStyles.formComponentDistance}
            prefix={<Icon name="cube-outline" type="ionicon" />}
            inputProps={{
              placeholder: consignmentPlaceholder,
              onChangeText: setName,
            }}
          />
          <TextField
            containerStyle={ConsignmentAddingStyles.formComponentDistance}
            prefix={<Icon name="shirt-outline" type="ionicon" />}
            inputProps={{
              placeholder: shipperPlaceholder,
              onChangeText: setShipper,
            }}
          />
          <DatePicker
            containerStyle={ConsignmentAddingStyles.formComponentDistance}
            onChangeValue={setCreatedDate}
          />
        </View>
        <RoundedButton
          containerStyle={ConsignmentAddingStyles.saveButton}
          title="Lưu lại"
          onPress={onSaveButtonPress}
        />
      </>
    );
  }, [
    state,
    distributorId,
    consignmentPlaceholder,
    shipperPlaceholder,
    onSaveButtonPress,
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
          <TextView text={title} style={ConsignmentAddingStyles.title} />
        }
        rightComponent={<Icon name="save-outline" type="ionicon" />}
        leftComponent={
          <Icon name="arrow-back-outline" type="ionicon" onPress={goBack} />
        }
      />
      <ScrollView contentContainerStyle={ConsignmentAddingStyles.container}>
        {renderForm()}
      </ScrollView>
    </ErrorBoundary>
  );
};
