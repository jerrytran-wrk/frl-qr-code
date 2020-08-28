import React from 'react';
import {View, StyleSheet, FlatListProps, RefreshControl} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {EmptyListView, EmptyListViewProps} from './EmptyListView';

export interface ListViewProps<ItemT> extends FlatListProps<ItemT> {
  refreshing?: boolean;
  onRefresh?: () => void;
  emptyListViewProps?: EmptyListViewProps;
}

export type ListViewFC<T = any> = React.FC<ListViewProps<T>>;

export const ListView: ListViewFC = (props) => {
  const emptyItem = React.useCallback(() => {
    if (props.refreshing) {
      return null;
    }
    return <EmptyListView {...props.emptyListViewProps} />;
  }, [props.emptyListViewProps, props.refreshing]);

  return (
    <View style={[styles.container]}>
      <FlatList
        {...props}
        ListEmptyComponent={emptyItem}
        refreshControl={
          <RefreshControl
            refreshing={props.refreshing === true}
            onRefresh={props.onRefresh}
          />
        }
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
});
