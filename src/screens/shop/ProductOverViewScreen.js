import React from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import {ProductItem} from '../../components/shop';

const ProductOverViewScreen = props => {
  const products = useSelector(state => state.products.availableProducts);
  return (
    <FlatList
      data={products}
      renderItem={({item}) => <ProductItem item={item} />}
    />
  );
};

export default ProductOverViewScreen;

const styles = StyleSheet.create({});
