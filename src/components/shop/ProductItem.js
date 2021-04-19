import React, {useRef} from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  Platform,
  TouchableNativeFeedback,
} from 'react-native';
import {PrimaryButton, Card} from '../shared';
import {useNavigation} from '@react-navigation/native';

const ProductItem = ({item, addToCard, deleteProduct}) => {
  const navigation = useNavigation();
  const goToDetails = () =>
    navigation.navigate(addToCard ? 'ProductDetail' : 'EditProduct', {
      productId: item.id,
    });

  const Touchable =
    Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

  return (
    <Touchable useForeground onPress={() => goToDetails()}>
      <Card styles={styles.product}>
        <Image source={{uri: item.imageUrl}} style={styles.image} />
        <View style={styles.details}>
          <Text style={styles.title}>{item.title} </Text>
          <Text style={styles.price}>{item.price.toFixed(2)}€</Text>
        </View>
        {addToCard ? (
          <View style={styles.actions}>
            <PrimaryButton
              title="go to Details"
              onPress={() => goToDetails()}
            />
            <PrimaryButton title="add to Cart" onPress={addToCard} />
          </View>
        ) : (
          <View style={styles.actions}>
            <PrimaryButton
              title="edit"
              onPress={() =>
                navigation.navigate('EditProduct', {productId: item.id})
              }
              styles={styles.b}
            />
            <PrimaryButton
              title="Delete"
              styles={styles.b}
              onPress={deleteProduct}
            />
          </View>
        )}
      </Card>
    </Touchable>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  product: {
    height: 300,
    margin: 20,
  },
  image: {
    width: '100%',
    height: '70%',
  },
  title: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 18,
    marginVertical: 4,
  },
  price: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    color: '#888',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    alignItems: 'center',
    height: '15%',
  },
  details: {
    alignItems: 'center',
    height: '15%',
  },
  b: {
    width: '30%',
  },
});
