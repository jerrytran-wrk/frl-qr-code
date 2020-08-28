import React from 'react';
import {View, StyleSheet, Pressable} from 'react-native';

import {Avatar, Badge, Icon} from 'react-native-elements';
//@ts-ignore
import Swipeable from 'react-native-swipeable';

import {TextView} from '@components';
import {Consignment} from '@data';
import {LightTheme} from '@resources';

export type ConsignmentListItemProps = {
  consignment: Consignment;
  onPress: (consignment: Consignment) => void;
};

export const ConsignmentListItem: React.FC<ConsignmentListItemProps> = (
  props,
) => {
  const {consignment, onPress} = props;

  const onItemPress = React.useCallback(() => {
    onPress(consignment);
  }, [consignment, onPress]);

  const renderAvatar = React.useMemo(() => {
    return (
      <Avatar
        size="medium"
        title={consignment?.name}
        source={{uri: 'consignment?.image'}}
        rounded
      />
    );
  }, [consignment]);

  const renderInformation = React.useMemo(() => {
    return (
      <View style={styles.infoContainer}>
        <TextView style={styles.title} text={consignment.name} />
        <TextView style={styles.description} text={consignment.shipper} />
        <TextView
          style={styles.description}
          text={consignment.createdDate.toString()}
        />
      </View>
    );
  }, [consignment]);

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
      <Pressable onPress={onItemPress} style={[styles.container]}>
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
