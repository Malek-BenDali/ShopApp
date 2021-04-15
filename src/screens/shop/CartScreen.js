import React from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {PrimaryButton} from '../../components/shared';
import {useSelector} from 'react-redux';
import {colors} from '../../constants';
import {CartItem} from '../../components/shop';

const CartScreen = () => {
  const total = useSelector(state => state.cart.total);
  const items = useSelector(state => {
    const transformedItems = [];
    for (const key in state.cart.items) {
      transformedItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        total: state.cart.items[key].total,
      });
    }
    return transformedItems;
  });
  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total : <Text style={styles.amount}>{total.toFixed(2)}€</Text>
        </Text>
        <PrimaryButton
          styles={{backgroundColor: colors.secondary}}
          title="Order Now"
          disabled={items.length === 0}
        />
      </View>
      {/* <FlatList data={items} /> */}
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  summaryText: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 18,
  },
  amount: {
    color: colors.primary,
  },
});
