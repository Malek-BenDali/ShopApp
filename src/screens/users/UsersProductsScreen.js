import React from 'react';
import {FlatList, Alert} from 'react-native';
import {ProductItem} from '../../components/shop';
import {useSelector, useDispatch} from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/headerButton';
import {useNavigation} from '@react-navigation/native';
import {deleteProduct} from '../../store/actions/products';

const UsersProductsScreen = props => {
  const userProducts = useSelector(state => state.products.userProducts);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  navigation.setOptions({
    headerTitle: 'Your Products',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Cart"
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => navigation.openDrawer()}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Cart"
          iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
          onPress={() => navigation.navigate('EditProduct')}
        />
      </HeaderButtons>
    ),
  });
  const deleteHandler = id => {
    Alert.alert('Are you sure ?', 'Do you really want to delete this ?', [
      {text: 'No', style: 'default'},
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => dispatch(deleteProduct(id)),
      },
    ]);
  };
  return (
    <FlatList
      data={userProducts}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <ProductItem deleteProduct={() => deleteHandler(item.id)} item={item} />
      )}
    />
  );
};

export default UsersProductsScreen;
