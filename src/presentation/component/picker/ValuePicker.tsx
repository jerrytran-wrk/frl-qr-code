import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, StyleProp, ViewStyle} from 'react-native';

import {TextView} from '../label';
import {ModalPicker, KeyValuePair} from './ModalPicker';
import {Icon} from 'react-native-elements';
import {LightTheme} from '@resources';

export type ValuePickerProps = {
  onChangeValue?: (id: string) => void;
  containerStyle?: StyleProp<ViewStyle>;
  data: KeyValuePair[];
  title?: string;
  selectedId?: string;
  error?: string;
};

export const ValuePicker: React.FC<ValuePickerProps> = (props) => {
  const {onChangeValue} = props;
  const selectedItem = React.useMemo(() => {
    return props.data.find((x) => x.id === props.selectedId);
  }, [props.data, props.selectedId]);

  const [isValuePickerVisible, setValuePickerVisible] = useState(false);
  const togglePicker = React.useCallback(() => {
    setValuePickerVisible(!isValuePickerVisible);
  }, [isValuePickerVisible]);

  const onPickItem = React.useCallback(
    (item: KeyValuePair) => {
      setValuePickerVisible(false);
      if (onChangeValue) {
        onChangeValue(item.id);
      }
    },
    [onChangeValue],
  );

  const renderError = React.useMemo(() => {
    if (!props.error) {
      return null;
    }
    return <TextView style={styles.error} text={props.error} />;
  }, [props.error]);
  return (
    <>
      <TouchableOpacity
        onPress={togglePicker}
        style={[styles.container, props.containerStyle]}>
        <TextView text={selectedItem?.value} />
        <Icon name="chevron-down-outline" type="ionicon" />
      </TouchableOpacity>
      <ModalPicker
        title={props.title}
        onPickItem={onPickItem}
        visible={isValuePickerVisible}
        onRequestClose={togglePicker}
        data={props.data}
      />
      {renderError}
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
    justifyContent: 'space-between',
  },
  error: {
    marginTop: 4,
    marginLeft: 8,
    color: LightTheme.colorScheme.secondary,
  },
});
