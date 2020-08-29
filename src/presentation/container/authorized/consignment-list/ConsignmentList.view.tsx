import React from 'react';
import {ListRenderItemInfo, View, InteractionManager} from 'react-native';
// import from library section
import {Header, Icon, SearchBar} from 'react-native-elements';

// importing from alias section
import {ErrorBoundary, TextView, ListView, FloatingButton} from '@components';
import {LightTheme} from '@resources';
import {debounce} from 'lodash';

// importing from local file
import {useConsignmentList} from './ConsignmentList.store';
import {ConsignmentListProps} from './ConsignmentList.type';
import {ConsignmentListStyles} from './ConsignmentList.style';
import {ConsignmentListItem} from './ListItem';
import {Distributor, Consignment} from '@data';
import {useFocusEffect} from '@react-navigation/native';

export const ConsignmentList: React.FC<ConsignmentListProps> = (props) => {
  const {colorScheme} = LightTheme;
  const [state, action] = useConsignmentList();
  const {navigation, route} = props;

  React.useEffect(() => {
    return action.reset;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const task = InteractionManager.runAfterInteractions(() => {
        if (navigation.isFocused()) {
          action.refresh('', route.params.distributor.id);
        }
      });

      return () => task.cancel();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  const title = React.useMemo(() => route.params.distributor.name, [route]);

  const [keyword, setKeyword] = React.useState('');

  const goBack = React.useCallback(() => {
    navigation.pop();
  }, [navigation]);

  const onItemPress = React.useCallback(
    (consignment: Consignment) => {
      navigation.navigate('ConsignmentDetail', {consignmentId: consignment.id});
    },
    [navigation],
  );

  const onEditItem = React.useCallback(
    (consignment: Consignment) => {
      navigation.navigate('ConsignmentEditing', {
        consignmentId: consignment.id,
      });
    },
    [navigation],
  );

  const onRemoveItem = React.useCallback(
    async (consignment: Consignment) => {
      await action.remove(consignment.id);
      action.refresh(keyword, route.params.distributor.id);
    },
    [action, keyword, route.params.distributor.id],
  );

  const onRefresh = React.useCallback(() => {
    action.refresh(keyword, route.params.distributor.id);
  }, [action, keyword, route]);

  const search = React.useCallback(
    debounce((value: string) => {
      action.refresh(value, route.params.distributor.id);
    }, 800),
    [route],
  );

  const onSearchBarChanged = React.useCallback(
    (value: string) => {
      setKeyword(value);
      search(value);
    },
    [search],
  );

  const goToConsignmentAdding = React.useCallback(() => {
    navigation.navigate('ConsignmentAdding', {
      distributor: route.params.distributor,
    });
  }, [navigation, route]);

  const onScanBarCodeButtonPress = React.useCallback(() => {
    navigation.navigate('ScanQR');
  }, [navigation]);

  const keyExtractor = React.useCallback(
    (item: Distributor) => item.id.toString(),
    [],
  );
  const renderItem = React.useCallback(
    ({item}: ListRenderItemInfo<Consignment>) => {
      return (
        <ConsignmentListItem
          onEdit={onEditItem}
          onRemove={onRemoveItem}
          onPress={onItemPress}
          consignment={item}
        />
      );
    },
    [onItemPress, onRemoveItem, onEditItem],
  );

  return (
    <ErrorBoundary>
      <View style={ConsignmentListStyles.container}>
        <Header
          statusBarProps={{
            translucent: true,
            backgroundColor: 'transparent',
            barStyle: 'dark-content',
          }}
          backgroundColor={colorScheme.primary}
          centerComponent={
            <TextView text={title} style={ConsignmentListStyles.title} />
          }
          leftComponent={
            <Icon name="arrow-back-outline" type="ionicon" onPress={goBack} />
          }
          rightComponent={
            <Icon
              name="add-outline"
              type="ionicon"
              onPress={goToConsignmentAdding}
            />
          }
        />

        <ListView
          ListHeaderComponent={
            <SearchBar
              onChangeText={onSearchBarChanged}
              platform="ios"
              showCancel={false}
              value={keyword}
            />
          }
          stickyHeaderIndices={[0]}
          refreshing={state.isLoading}
          onRefresh={onRefresh}
          data={state.consignments}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      </View>
      <FloatingButton onPress={onScanBarCodeButtonPress}>
        <Icon
          name="qr-code-outline"
          type="ionicon"
          color={colorScheme.onSecondary}
        />
      </FloatingButton>
    </ErrorBoundary>
  );
};
