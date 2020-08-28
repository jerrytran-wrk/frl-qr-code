import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, StyleProp, ViewStyle} from 'react-native';
import {TextView} from '../label';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Icon} from 'react-native-elements';
import {LightTheme} from '@resources';

export type TimePickerProps = {
  onChangeValue?: (value: Date) => void;
  containerStyle?: StyleProp<ViewStyle>;
  defaultValue?: Date;
};

export const TimePicker: React.FC<TimePickerProps> = (props) => {
  const {onChangeValue} = props;
  const [value, setValue] = React.useState(props.defaultValue);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const togglePicker = React.useCallback(() => {
    setTimePickerVisible(!isTimePickerVisible);
  }, [isTimePickerVisible]);

  const handleConfirm = React.useCallback(
    (date: Date) => {
      togglePicker();
      setValue(date);
      if (onChangeValue) {
        onChangeValue(date);
      }
    },
    [onChangeValue, togglePicker],
  );

  return (
    <>
      <TouchableOpacity
        onPress={togglePicker}
        style={[styles.container, props.containerStyle]}>
        <TextView text={moment(value).format('HH:mm')} />
        <Icon name="calendar-outline" type="ionicon" />
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
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
