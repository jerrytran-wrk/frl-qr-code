import React from 'react';
import {View, StyleSheet, Pressable} from 'react-native';

import {Avatar, Badge, Icon} from 'react-native-elements';
//@ts-ignore
import Swipeable from 'react-native-swipeable';

import {TextView} from '@components';
import {Distributor} from '@data';
import {LightTheme} from '@resources';

export type DistributorListItemProps = {
  distributor: Distributor;
  onPress?: () => void;
};

export const DistributorListItem: React.FC<DistributorListItemProps> = (
  props,
) => {
  const {distributor} = props;
  const renderAvatar = React.useMemo(() => {
    return (
      <Avatar
        size="medium"
        title={distributor?.name}
        source={{uri: distributor?.image}}
        rounded
      />
    );
  }, [distributor]);

  const renderInformation = React.useMemo(() => {
    return (
      <View style={styles.infoContainer}>
        <TextView style={styles.title} text={distributor.name} />
        <TextView style={styles.description} text={distributor.address} />
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
          />
        </Pressable>,
      ]}>
      <Pressable onPress={props.onPress} style={[styles.container]}>
        <View style={styles.content}>
          {renderAvatar}
          {renderInformation}
          <Badge value="3" badgeStyle={styles.badgeStyle} />
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
    width: 150,
    height: '100%',
  },
});
