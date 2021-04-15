import React from 'react';
import {FlatList, Platform} from 'react-native';
import {useSelector} from 'react-redux';
import {ProductItem} from '../../components/shop';
import {useDispatch} from 'react-redux';
import * as CartActions from '../../store/actions/cart';
import {useNavigation} from '@react-navigation/native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/headerButton';

const ProductOverViewScreen = props => {
  const products = useSelector(state => state.products.availableProducts);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  navigation.setOptions({
    headerTitle: 'All Products',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Cart"
          iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          onPress={() => navigation.navigate('Cart')}
        />
      </HeaderButtons>
    ),
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
      data={products}
      renderItem={({item}) => (
        <ProductItem
          item={item}
          addToCard={() => dispatch(CartActions.addToCart(item))}
        />
      )}
    />
  );
};

export default ProductOverViewScreen;
