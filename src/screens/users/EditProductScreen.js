import React, {useState} from 'react';
import {StyleSheet, Text, View, ScrollView, TextInput} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/headerButton';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
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
  const handlePress = () => {
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
  };

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
            keyboardType="numeric"
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
