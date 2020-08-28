import React from 'react';
import {View} from 'react-native';
// import from library section
import QRCode from 'react-native-qrcode-svg';
import {Header, Icon} from 'react-native-elements';

// importing from alias section
import {
  ErrorBoundary,
  TextView,
  TextField,
  RoundedButton,
  DatePicker,
  ValuePicker,
} from '@components';
// importing from local file
import {useConsignmentAdding} from './ConsignmentAdding.store';
import {ConsignmentAddingProps} from './ConsignmentAdding.type';
import {ConsignmentAddingStyles} from './ConsignmentAdding.style';
import {LightTheme} from '@resources';

export const ConsignmentAdding: React.FC<ConsignmentAddingProps> = (props) => {
  const {colorScheme} = LightTheme;
  const [state, action] = useConsignmentAdding();
  const {navigation} = props;
  const title = React.useMemo(() => 'Thêm Lô Hàng', []);
  const shipperPlaceholder = React.useMemo(() => 'Người giao hàng', []);
  const consignmentPlaceholder = React.useMemo(() => 'Lô Hàng', []);

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
            data={[]}
            // selectedId={}
          />
          <TextField
            containerStyle={ConsignmentAddingStyles.formComponentDistance}
            prefix={<Icon name="cube-outline" type="ionicon" />}
            inputProps={{
              placeholder: consignmentPlaceholder,
            }}
          />
          <TextField
            containerStyle={ConsignmentAddingStyles.formComponentDistance}
            prefix={<Icon name="shirt-outline" type="ionicon" />}
            inputProps={{
              placeholder: shipperPlaceholder,
            }}
          />
          <DatePicker
            containerStyle={ConsignmentAddingStyles.formComponentDistance}
          />
        </View>
        <RoundedButton
          containerStyle={ConsignmentAddingStyles.saveButton}
          title="Lưu lại"
        />
      </>
    );
  }, [consignmentPlaceholder, shipperPlaceholder]);

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
          <TextView text={title} style={ConsignmentAddingStyles.title} />
        }
        rightComponent={<Icon name="save-outline" type="ionicon" />}
        leftComponent={
          <Icon name="arrow-back-outline" type="ionicon" onPress={goBack} />
        }
      />
      <View style={ConsignmentAddingStyles.container}>{renderForm()}</View>
    </ErrorBoundary>
  );
};
