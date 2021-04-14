import React from 'react';
import {StyleSheet, ScrollView, Image, Text, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {PrimaryButton} from '../../components/shared';
import * as cartActions from '../../store/actions/cart';

const ProductDetailScreen = ({route, navigation}) => {
  const productId = route.params.productId;
  const dispatch = useDispatch();
  const selectedProduct = useSelector(state =>
    state.products.availableProducts.find(prod => prod.id === productId),
  );
  navigation.setOptions({
    headerTitle: selectedProduct.title,
    headerTitleStyle: {
      fontFamily: 'OpenSans-Bold',
    },
  });
  return (
    <ScrollView>
      <Image style={styles.image} source={{uri: selectedProduct.imageUrl}} />
      <PrimaryButton
        styles={styles.action}
        title="Add to Card"
        onPress={() => {
          dispatch(cartActions.addToCart(selectedProduct));
        }}
      />
      <Text style={styles.price}>{selectedProduct.price.toFixed(2)}€</Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
  },
  price: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20,
  },
  description: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20,
  },
  action: {
    marginVertical: 10,
    alignSelf: 'center',
    width: '40%',
  },
});
