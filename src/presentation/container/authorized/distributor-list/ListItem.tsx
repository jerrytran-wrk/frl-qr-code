import React from 'react';
import {View, StyleSheet, Pressable, Alert} from 'react-native';

import {Avatar, Badge, Icon} from 'react-native-elements';
//@ts-ignore
import Swipeable from 'react-native-swipeable';

import {TextView} from '@components';
import {Distributor} from '@data';
import {LightTheme} from '@resources';
import {useDistributorList} from './DistributorList.store';

export type DistributorListItemProps = {
  distributor: Distributor;
  onPress?: (distributor: Distributor) => void;
};

export const DistributorListItem: React.FC<DistributorListItemProps> = (
  props,
) => {
  const [state, action] = useDistributorList();
  const {distributor, onPress} = props;

  const remove = React.useCallback(async () => {
    await action.remove(distributor.id);
    action.refresh(state.keyword);
  }, [action, distributor.id, state.keyword]);

  const onItemPress = React.useCallback(() => {
    onPress && onPress(distributor);
  }, [onPress, distributor]);

  const onTrashButtonPress = React.useCallback(async () => {
    Alert.alert(
      'Cảnh báo',
      `Bạn có muốn xóa nhà phân phối ${distributor.name}?`,
      [
        {
          text: 'Đồng ý',
          onPress: remove,
        },
        {
          text: 'Hủy',
          style: 'cancel',
        },
      ],
    );
  }, [distributor.name, remove]);

  const renderAvatar = React.useMemo(() => {
    return (
      <Avatar
        size="medium"
        title={distributor?.name.substr(0, 2)}
        source={{uri: 'distributor?.image'}}
        rounded
      />
    );
  }, [distributor]);

  const renderInformation = React.useMemo(() => {
    return (
      <View style={styles.infoContainer}>
        <TextView style={styles.title} text={distributor.name} />
        <TextView style={styles.description} text={distributor.address} />
        <TextView style={styles.phone} text={distributor.phone} />
      </View>
    );
  }, [distributor]);

  return (
    <Swipeable
      rightButtonWidth={150}
      rightButtons={[
        <Pressable style={styles.removeButton}>
          <Icon
            name="trash-outline"
            type="ionicon"
            color={LightTheme.colorScheme.onSecondary}
            onPress={onTrashButtonPress}
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
  phone: {
    color: LightTheme.colorScheme.secondary,
  },
  badgeStyle: {
    backgroundColor: LightTheme.colorScheme.secondary,
  },
  removeButton: {
    backgroundColor: LightTheme.colorScheme.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    height: '100%',
  },
});
