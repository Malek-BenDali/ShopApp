import React, {useCallback, useState, useReducer} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/headerButton';
import {useSelector, useDispatch} from 'react-redux';
import {createProduct, updateProduct} from '../../store/actions/products';
import {PrimaryButton, Input} from '../../components/shared';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';
const formReducer = (state, action) => {
  if (action.type == FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidity,
      [action.input]: action.isValid,
    };
    let updateformIsValid = true;
    for (const key in updatedValidities) {
      updateformIsValid = updateformIsValid && updatedValidities[key];
    }
    return {
      ...state,
      formIsValid: updateformIsValid,
      inputValidity: updatedValidities,
      inputValues: updatedValues,
    };
  }
};

const EditProductScreen = ({navigation, route}) => {
  const productId = route.params?.productId || undefined;
  const editedProducts = useSelector(state =>
    state.products.userProducts.find(prod => prod.id == productId),
  );

  const [isTitleValid, setIsTitleValid] = useState(false);
  const dispatch = useDispatch();

  const [formState, dispatchForm] = useReducer(formReducer, {
    inputValues: {
      title: editedProducts?.title || '',
      imageUrl: editedProducts?.imageUrl || '',
      price: editedProducts?.price.toString() || '',
      description: editedProducts?.description || '',
    },
    inputValidity: {
      title: editedProducts ? true : false,
      imageUrl: editedProducts ? true : false,
      price: editedProducts ? true : false,
      description: editedProducts ? true : false,
    },
    formIsValid: editedProducts ? true : false,
  });

  const handlePress = useCallback(() => {
    if (!formState.formIsValid) {
      Alert.alert('Wrong Input', 'Please check the errors in the form', [
        {text: 'Ok'},
      ]);
      return;
    }
    const {title, description, imageUrl, price} = formState.inputValues;
    if (productId) {
      dispatch(
        updateProduct(
          productId,
          title,
          description,
          imageUrl,
          parseFloat(price),
        ),
      );
    } else
      dispatch(createProduct(title, description, imageUrl, parseFloat(price)));
    navigation.goBack();
  }, [dispatch, productId, formState]);

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

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchForm({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchForm],
  );

  // const TextChangeHandler = (inputIdentifier, text) => {
  //   let isValid = false;
  //   if (text.trim().length > 0) {
  //     isValid = true;
  //   }
  //   dispatchForm({
  //     type: FORM_INPUT_UPDATE,
  //     value: text,
  //     isValid,
  //     input: inputIdentifier,
  //   });
  // };

  return (
    <ScrollView>
      <View style={styles.form}>
        <Input
          id="title"
          label="Title"
          errorText="Please enter a valid title!"
          keyboardType="default"
          autoCapitalize="sentences"
          autoCorrect
          returnKeyType="next"
          onInputChange={inputChangeHandler}
          initialValue={editedProducts?.title || ''}
          initiallyValid={!!editedProducts}
          required
        />
        <Input
          id="imageUrl"
          label="Image Url"
          errorText="Please enter a valid image url!"
          keyboardType="default"
          returnKeyType="next"
          onInputChange={inputChangeHandler}
          initialValue={editedProducts?.imageUrl || ''}
          initiallyValid={!!editedProducts}
          required
        />

        <Input
          id="price"
          label="Price"
          errorText="Please enter a valid price!"
          keyboardType="decimal-pad"
          returnKeyType="next"
          onInputChange={inputChangeHandler}
          required
          min={0.1}
        />

        <Input
          id="description"
          label="Description"
          errorText="Please enter a valid description!"
          keyboardType="default"
          autoCapitalize="sentences"
          autoCorrect
          multiline
          numberOfLines={3}
          onInputChange={inputChangeHandler}
          initialValue={editedProducts?.description || ''}
          initiallyValid={!!editedProducts}
          required
          minLength={5}
        />
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
