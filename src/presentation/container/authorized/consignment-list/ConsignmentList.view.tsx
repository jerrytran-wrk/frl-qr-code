import React from 'react';
import {ListRenderItemInfo, View} from 'react-native';
// import from library section
import {Header, Icon, SearchBar} from 'react-native-elements';

// importing from alias section
import {ErrorBoundary, TextView, ListView} from '@components';
import {LightTheme} from '@resources';

// importing from local file
import {useConsignmentList} from './ConsignmentList.store';
import {ConsignmentListProps} from './ConsignmentList.type';
import {ConsignmentListStyles} from './ConsignmentList.style';
import {ConsignmentListItem} from './ListItem';
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

export const ConsignmentList: React.FC<ConsignmentListProps> = (props) => {
  const {colorScheme} = LightTheme;
  const [state, action] = useConsignmentList();
  const {navigation} = props;

  const title = React.useMemo(() => 'Lô Hàng', []);

  const goBack = React.useCallback(() => {
    navigation.pop();
  }, [navigation]);

  const goToConsignmentAdding = React.useCallback(() => {
    navigation.navigate('ConsignmentAdding');
  }, [navigation]);

  const keyExtractor = React.useCallback(
    (item: Distributor) => item.id.toString(),
    [],
  );
  const renderItem = React.useCallback(
    ({item}: ListRenderItemInfo<Distributor>) => {
      return <ConsignmentListItem distributor={item} />;
    },
    [],
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
