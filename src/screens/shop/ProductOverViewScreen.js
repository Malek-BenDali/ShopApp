import React, {useState, useEffect} from 'react';
import {
  FlatList,
  Platform,
  StatusBar,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {useSelector} from 'react-redux';
import {ProductItem} from '../../components/shop';
import {useDispatch} from 'react-redux';
import * as CartActions from '../../store/actions/cart';
import * as ProductActions from '../../store/actions/products';
import {useNavigation} from '@react-navigation/native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/headerButton';
import {colors} from '../../constants';

const ProductOverViewScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const products = useSelector(state => state.products.availableProducts);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const loadedProducts = async () => {
    await dispatch(ProductActions.fetchPorducts());
  };
  useEffect(() => {
    setIsLoading(true);
    loadedProducts().then(() => setIsLoading(false));
    return () => {};
  }, [dispatch]);

  useEffect(() => {
    navigation.addListener('focus', loadedProducts);
    return () => {
      navigation.removeListener('focus', loadedProducts);
    };
  }, [loadedProducts]);

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

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.centered}>
        <Text> No product available</Text>
      </View>
    );
  }

  return (
    <>
      <FlatList
        onRefresh={loadedProducts}
        refreshing={isLoading}
        data={products}
        renderItem={({item}) => (
          <ProductItem
            item={item}
            addToCard={() => dispatch(CartActions.addToCart(item))}
          />
        )}
      />
      <StatusBar backgroundColor={colors.primary} />
    </>
  );
};

export default ProductOverViewScreen;

const styles = StyleSheet.create({
  centered: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
