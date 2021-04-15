import React from 'react';
import {FlatList, StyleSheet, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/headerButton';
import {OrderItem} from '../../components/shop';

const OrdersScreen = props => {
  const orders = useSelector(state => state.orders.orders);
  const navigation = useNavigation();
  navigation.setOptions({
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Cart"
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => navigation.openDrawer()}
        />
      </HeaderButtons>
    ),
  });
  return (
    <FlatList
      data={orders}
      keyExtractor={item => item.id}
      renderItem={({item}) => <OrderItem item={item} />}
    />
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({});
