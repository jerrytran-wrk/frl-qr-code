import React from 'react';
import {ListRenderItemInfo, View} from 'react-native';
// import from library section
import {Header, Icon, SearchBar} from 'react-native-elements';

// importing from alias section
import {ErrorBoundary, TextView, ListView} from '@components';
import {LightTheme} from '@resources';

// importing from local file
import {useDistributorList} from './DistributorList.store';
import {DistributorListProps} from './DistributorList.type';
import {DistributorListStyles} from './DistributorList.style';
import {DistributorListItem} from './ListItem';
import {Distributor} from '@data';

const FAKE: Distributor[] = [
  {
    id: 1,
    address: 'Chung cư Imperia - Huy Tưởng',
    name: 'Nhà Phân phối 1',
    image: 'Nhà Phân phối 1',
    phone: '0123456789',
  },
  {
    id: 2,
    address: 'Chung cư Imperia - Huy Tưởng',
    name: 'Nhà Phân phối 1',
    image: 'Nhà Phân phối 1',
    phone: '0123456789',
  },
  {
    id: 3,
    address: 'Chung cư Imperia - Huy Tưởng',
    name: 'Nhà Phân phối 1',
    image: 'Nhà Phân phối 1',
    phone: '0123456789',
  },
];

export const DistributorList: React.FC<DistributorListProps> = (props) => {
  const {colorScheme} = LightTheme;
  const [state, action] = useDistributorList();
  const {navigation} = props;

  const title = React.useMemo(() => 'Nhà phân phối', []);

  const onAddButtonPress = React.useCallback(() => {
    navigation.navigate('DistributorAdding');
  }, [navigation]);

  const onItemPress = React.useCallback(() => {
    navigation.navigate('ConsignmentList');
  }, [navigation]);

  const keyExtractor = React.useCallback(
    (item: Distributor) => item.id.toString(),
    [],
  );
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
        <SearchBar platform="ios" showCancel={false} />
        <ListView
          data={FAKE}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      </View>
    </ErrorBoundary>
  );
};
