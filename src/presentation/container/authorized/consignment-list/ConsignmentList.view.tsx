import React from 'react';
import {ListRenderItemInfo, View, InteractionManager} from 'react-native';
// import from library section
import {Header, Icon, SearchBar} from 'react-native-elements';

// importing from alias section
import {ErrorBoundary, TextView, ListView} from '@components';
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

  const keyExtractor = React.useCallback(
    (item: Distributor) => item.id.toString(),
    [],
  );
  const renderItem = React.useCallback(
    ({item}: ListRenderItemInfo<Consignment>) => {
      return <ConsignmentListItem onPress={onItemPress} consignment={item} />;
    },
    [onItemPress],
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
        <SearchBar
          onChangeText={onSearchBarChanged}
          platform="ios"
          showCancel={false}
          value={keyword}
        />
        <ListView
          refreshing={state.isLoading}
          onRefresh={onRefresh}
          data={state.consignments}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      </View>
    </ErrorBoundary>
  );
};
