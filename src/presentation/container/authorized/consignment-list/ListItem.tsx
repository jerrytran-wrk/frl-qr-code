import React from 'react';
import {View, StyleSheet, Pressable, Alert} from 'react-native';

import {Icon, colors} from 'react-native-elements';
import moment from 'moment';
//@ts-ignore
import Swipeable from 'react-native-swipeable';

import {TextView, KeyValueText} from '@components';
import {Consignment} from '@data';
import {LightTheme, Colors} from '@resources';
import QRCode from 'react-native-qrcode-svg';

export type ConsignmentListItemProps = {
  consignment: Consignment;
  onPress: (consignment: Consignment) => void;
  onRemove: (consignment: Consignment) => void;
  onEdit: (consignment: Consignment) => void;
};

export const ConsignmentListItem: React.FC<ConsignmentListItemProps> = (
  props,
) => {
  const {consignment, onPress, onRemove, onEdit} = props;

  const onTrashButtonPress = React.useCallback(() => {
    Alert.alert(
      'Cảnh báo',
      `Bạn có muốn xóa nhà lô hàng ${consignment.name}?`,
      [
        {
          text: 'Đồng ý',
          onPress: () => onRemove(consignment),
        },
        {
          text: 'Hủy',
          style: 'cancel',
        },
      ],
    );
  }, [consignment, onRemove]);

  const onItemPress = React.useCallback(() => {
    onPress(consignment);
  }, [consignment, onPress]);

  const onEditButtonPress = React.useCallback(() => {
    onEdit(consignment);
  }, [consignment, onEdit]);

  const renderAvatar = React.useMemo(() => {
    return (
      <QRCode
        backgroundColor={Colors.WHITE}
        quietZone={5}
        value={consignment.id}
        size={60}
      />
    );
  }, [consignment]);

  const renderInformation = React.useMemo(() => {
    return (
      <View style={styles.infoContainer}>
        <TextView style={styles.title} text={consignment.name} />
        <KeyValueText title="Người giao hàng: " value={consignment.shipper} />
        <KeyValueText
          title="Ngày giao:  "
          value={moment(consignment.createdDate).format('DD/MM/YYYY')}
        />
      </View>
    );
  }, [consignment]);

  return (
    <Swipeable
      rightButtonWidth={100}
      rightButtons={[
        <Pressable style={styles.removeButton} onPress={onTrashButtonPress}>
          <Icon
            name="trash-outline"
            type="ionicon"
            color={LightTheme.colorScheme.onSecondary}
            onPress={onTrashButtonPress}
          />
        </Pressable>,
        <Pressable style={styles.editButton} onPress={onEditButtonPress}>
          <Icon
            name="create-outline"
            type="ionicon"
            color={LightTheme.colorScheme.onSecondary}
            onPress={onEditButtonPress}
          />
        </Pressable>,
      ]}>
      <Pressable onPress={onItemPress} style={[styles.container]}>
        <View style={styles.content}>
          {renderAvatar}
          {renderInformation}
          <Icon name="chevron-forward-outline" type="ionicon" />
        </View>
      </Pressable>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 0,
    paddingHorizontal: 8,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  infoContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  timeLabel: {},

  title: {
    fontWeight: '700',
    fontSize: 16,
  },
  description: {},
  badgeStyle: {
    backgroundColor: LightTheme.colorScheme.secondary,
  },
  removeButton: {
    backgroundColor: LightTheme.colorScheme.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: '100%',
  },
  editButton: {
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: '100%',
  },
});
