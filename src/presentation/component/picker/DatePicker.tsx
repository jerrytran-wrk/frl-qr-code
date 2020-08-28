import React, {useState} from 'react';
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {Icon} from 'react-native-elements';

import {TextView} from '../label';
import {LightTheme} from '@resources';

export type DatePickerProps = {
  onChangeValue?: (value: Date) => void;
  containerStyle?: StyleProp<ViewStyle>;
  defaultValue?: Date;
};

export const DatePicker: React.FC<DatePickerProps> = (props) => {
  const {onChangeValue} = props;
  const [value, setValue] = React.useState(props.defaultValue);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const togglePicker = React.useCallback(() => {
    setDatePickerVisible(!isDatePickerVisible);
  }, [isDatePickerVisible]);

  const handleConfirm = React.useCallback(
    (date: Date) => {
      togglePicker();
      setValue(date);
      if (onChangeValue) {
        onChangeValue(date);
      }
    },
    [onChangeValue, togglePicker, setValue],
  );

  return (
    <>
      <TouchableOpacity
        onPress={togglePicker}
        style={[styles.container, props.containerStyle]}>
        <TextView text={moment(value).format('DD-MM-YYYY')} />
        <Icon name="calendar-outline" type="ionicon" />
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={togglePicker}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 44,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: LightTheme.colorScheme.secondary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    justifyContent: 'space-between',
  },
});
