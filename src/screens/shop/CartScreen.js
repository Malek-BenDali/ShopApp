import React from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {PrimaryButton, Card} from '../../components/shared';
import {useSelector, useDispatch} from 'react-redux';
import {colors} from '../../constants';
import {CartItem} from '../../components/shop';
import {removeFromCart} from '../../store/actions/cart';
import {addOrder} from '../../store/actions/orders';

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

    return transformedItems.filter(item => item.productId !== 'total');
  });

  const dispatch = useDispatch();
  return (
    <View style={styles.screen}>
      <Card styles={styles.summary}>
        <Text style={styles.summaryText}>
          Total : <Text style={styles.amount}>{total.toFixed(2)}€</Text>
        </Text>
        <PrimaryButton
          styles={{backgroundColor: colors.secondary}}
          title="Order Now"
          disabled={items.length === 0}
          onPress={() => dispatch(addOrder(items, total))}
        />
      </Card>
      <FlatList
        data={items}
        keyExtractor={item => item.productId}
        renderItem={({item}) => (
          <CartItem
            item={item}
            onRemove={() => {
              dispatch(removeFromCart(item.productId));
            }}
          />
        )}
      />
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
