import React, {useCallback, useState} from 'react';
import {StyleSheet, Text, View, ScrollView, TextInput} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/headerButton';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {createProduct, updateProduct} from '../../store/actions/products';
import {PrimaryButton} from '../../components/shared';

const EditProductScreen = ({navigation, route}) => {
  const productId = route.params?.productId || undefined;
  const editedProducts = useSelector(state =>
    state.products.userProducts.find(prod => prod.id == productId),
  );
  const [title, setTitle] = useState(editedProducts?.title || '');
  const [imageUrl, setImageUrl] = useState(editedProducts?.imageUrl || '');
  const [price, setPrice] = useState(editedProducts?.price.toString() || '');
  const [description, setDescription] = useState(
    editedProducts?.description || '',
  );
  const dispatch = useDispatch();

  const handlePress = useCallback(() => {
    if (productId)
      dispatch(
        updateProduct(
          productId,
          title,
          description,
          imageUrl,
          parseFloat(price),
        ),
      );
    else
      dispatch(createProduct(title, description, imageUrl, parseFloat(price)));
    navigation.goBack();
  }, [dispatch, title, productId, description, imageUrl, price]);

  navigation.setOptions({
    headerTitle: productId ? 'Edit product' : 'Add Product',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Save"
          iconName={
            Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'
          }
          onPress={() => handlePress()}
        />
      </HeaderButtons>
    ),
  });

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={text => setTitle(text)}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image Url</Text>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={text => setImageUrl(text)}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Price</Text>
          <TextInput
            style={styles.input}
            value={price}
            onChangeText={text => setPrice(text)}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Decription</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={text => setDescription(text)}
          />
        </View>
      </View>
      <PrimaryButton
        title={productId ? 'edit' : 'add'}
        onPress={() => handlePress()}
      />
    </ScrollView>
  );
};

export default EditProductScreen;

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  formControl: {
    width: '100%',
  },
  label: {
    fontFamily: 'OpenSans-Bold',
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
});
