import React from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import {ProductItem} from '../../components/shop';
import {useDispatch} from 'react-redux';
import * as CartActions from '../../store/actions/cart';

const ProductOverViewScreen = props => {
  const products = useSelector(state => state.products.availableProducts);
  const dispatch = useDispatch();
  return (
    <FlatList
      data={products}
      renderItem={({item}) => (
        <ProductItem
          item={item}
          addToCard={dispatch(CartActions.addToCart(item))}
        />
      )}
    />
  );
};

export default ProductOverViewScreen;

const styles = StyleSheet.create({});
