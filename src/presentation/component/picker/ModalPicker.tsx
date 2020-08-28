import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  StatusBar,
  ListRenderItemInfo,
  TouchableWithoutFeedback,
} from 'react-native';
import {ListView} from '../listing';
import {Colors, FontSizeDimens, TextStyles, LinearColors} from '@res';
import {Card, ListItem, SearchBar, Header} from 'react-native-elements';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {FlatList} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

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
  const onPressItem = React.useCallback(
    (item: KeyValuePair) => () => {
      props.onPickItem(item);
    },
    [],
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
    [],
  );

  const keyExtractor = React.useCallback((item: KeyValuePair) => item.id, []);

  const renderListValue = React.useMemo(() => {
    return (
      <View style={styles.card}>
        <TouchableWithoutFeedback>
          <>
            <Header
              ViewComponent={LinearGradient}
              linearGradientProps={{colors: LinearColors.lineRed}}
              centerComponent={{
                text: props.title,
                style: {
                  color: Colors.primaryWhite,
                  ...TextStyles.navTitle,
                },
              }}
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
  }, [props.data]);

  return (
    <Modal
      onRequestClose={props.onRequestClose}
      animationType="fade"
      visible={props.visible}
      transparent>
      <StatusBar backgroundColor={Colors.primaryOverlay} />
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
    backgroundColor: Colors.primaryOverlay,
    padding: '5%',
  },
  card: {
    height: '60%',
    width: '100%',
    backgroundColor: Colors.primaryWhite,
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
    paddingVertical: responsiveHeight(3),
  },
});
