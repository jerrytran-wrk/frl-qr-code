import React, {useState} from 'react';
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {TextView} from '../label';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export type TimePickerProps = {
  onChangeValue?: (value: Date) => void;
  containerStyle?: StyleProp<ViewStyle>;
  defaltValue?: Date;
};

export const TimePicker: React.FC<TimePickerProps> = (props) => {
  const [value, setValue] = React.useState(props.defaltValue);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const toglePicker = React.useCallback(() => {
    setTimePickerVisible(!isTimePickerVisible);
  }, [isTimePickerVisible]);

  const handleConfirm = React.useCallback(
    (date: Date) => {
      toglePicker();
      setValue(date);
      if (props.onChangeValue) {
        props.onChangeValue(date);
      }
    },
    [toglePicker, props.onChangeValue],
  );

  return (
    <>
      <TouchableOpacity
        onPress={toglePicker}
        style={[styles.container, props.containerStyle]}>
        <TextView text={moment(value).format('HH:mm')} />
        <Image source={AssetIcons.GRAY_CLOCK} />
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={toglePicker}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: SizeDimens.mdInput,
    borderRadius: SizeDimens.mdInput * 0.5,
    borderWidth: 1,
    borderColor: Colors.primaryBlue,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(4),
    justifyContent: 'space-between',
  },
});
