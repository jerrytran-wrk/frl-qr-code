import React from 'react';
import {
  View,
  StyleSheet,
  Modal,
  ListRenderItemInfo,
  TouchableWithoutFeedback,
} from 'react-native';

import {ListItem, Header} from 'react-native-elements';

import {LightTheme, Colors} from '@resources';

import {ListView} from '../listing';

export type KeyValuePair = {
  id: string;
  value: string;
};

export type ModalPickerProps = {
  visible: boolean;
  onRequestClose: () => void;
  onPickItem: (item: KeyValuePair) => void;
  data: KeyValuePair[];
  title?: string;
};

export const ModalPicker: React.FC<ModalPickerProps> = (props) => {
  const {onPickItem} = props;
  const onPressItem = React.useCallback(
    (item: KeyValuePair) => () => {
      onPickItem(item);
    },
    [onPickItem],
  );

  const renderItem = React.useCallback(
    ({item}: ListRenderItemInfo<KeyValuePair>) => {
      return (
        <ListItem
          containerStyle={styles.item}
          onPress={onPressItem(item)}
          title={item.value}
          bottomDivider
        />
      );
    },
    [onPressItem],
  );

  const keyExtractor = React.useCallback((item: KeyValuePair) => item.id, []);

  const renderListValue = React.useMemo(() => {
    return (
      <View style={styles.card}>
        <TouchableWithoutFeedback>
          <>
            <Header
              statusBarProps={{backgroundColor: Colors.OVERLAY}}
              centerComponent={{
                text: props.title,
                style: {
                  color: LightTheme.colorScheme.onSecondary,
                },
              }}
              backgroundColor={LightTheme.colorScheme.secondary}
            />
            <ListView
              style={styles.list}
              keyExtractor={keyExtractor}
              renderItem={renderItem}
              data={props.data}
            />
          </>
        </TouchableWithoutFeedback>
      </View>
    );
  }, [keyExtractor, props.data, props.title, renderItem]);

  return (
    <Modal
      onRequestClose={props.onRequestClose}
      animationType="fade"
      visible={props.visible}
      transparent>
      <TouchableWithoutFeedback onPress={props.onRequestClose}>
        <View style={styles.container}>{renderListValue}</View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.OVERLAY,
    padding: '5%',
  },
  card: {
    height: '60%',
    width: '100%',
    backgroundColor: LightTheme.colorScheme.background,
    borderRadius: 24,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  list: {
    flex: 1,
  },
  item: {
    backgroundColor: 'transparent',
  },
});
