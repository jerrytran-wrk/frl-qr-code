import React from 'react';
import {ListRenderItemInfo, View, InteractionManager} from 'react-native';
// import from library section
import {Header, Icon, SearchBar} from 'react-native-elements';
import {useFocusEffect} from '@react-navigation/native';
import {debounce} from 'lodash';
// importing from alias section
import {ErrorBoundary, TextView, ListView, FloatingButton} from '@components';
import {LightTheme} from '@resources';
import {Distributor} from '@data';
// importing from local file
import {useDistributorList} from './DistributorList.store';
import {DistributorListProps} from './DistributorList.type';
import {DistributorListStyles} from './DistributorList.style';
import {DistributorListItem} from './ListItem';

export const DistributorList: React.FC<DistributorListProps> = (props) => {
  const {colorScheme} = LightTheme;
  const [state, action] = useDistributorList();
  const {navigation} = props;

  useFocusEffect(
    React.useCallback(() => {
      const task = InteractionManager.runAfterInteractions(() => {
        if (navigation.isFocused()) {
          action.refresh('');
        }
      });

      return () => task.cancel();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  const title = React.useMemo(() => 'Nhà phân phối', []);

  const [keyword, setKeyword] = React.useState('');

  const onRefresh = React.useCallback(() => {
    action.refresh(keyword);
  }, [action, keyword]);

  const search = React.useCallback(
    debounce((value: string) => {
      action.refresh(value);
    }, 800),
    [],
  );

  const onSearchBarChanged = React.useCallback(
    (value: string) => {
      setKeyword(value);
      search(value);
    },
    [search],
  );

  const onAddButtonPress = React.useCallback(() => {
    navigation.navigate('DistributorAdding');
  }, [navigation]);

  const onItemPress = React.useCallback(
    (distributor: Distributor) => {
      navigation.navigate('ConsignmentList', {distributor});
    },
    [navigation],
  );

  const onScanBarCodeButtonPress = React.useCallback(() => {
    navigation.navigate('ScanQR');
  }, [navigation]);

  const keyExtractor = React.useCallback((item: Distributor) => item.id, []);
  const renderItem = React.useCallback(
    ({item}: ListRenderItemInfo<Distributor>) => {
      return <DistributorListItem distributor={item} onPress={onItemPress} />;
    },
    [onItemPress],
  );

  return (
    <ErrorBoundary>
      <View style={DistributorListStyles.container}>
        <Header
          statusBarProps={{
            translucent: true,
            backgroundColor: 'transparent',
            barStyle: 'dark-content',
          }}
          backgroundColor={colorScheme.primary}
          centerComponent={
            <TextView text={title} style={DistributorListStyles.title} />
          }
          rightComponent={
            <Icon
              name="add-outline"
              type="ionicon"
              onPress={onAddButtonPress}
            />
          }
        />
        <SearchBar
          onChangeText={onSearchBarChanged}
          value={keyword}
          platform="ios"
          showCancel={false}
        />
        <ListView
          onRefresh={onRefresh}
          refreshing={state.isLoading}
          data={state.distributors}
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
