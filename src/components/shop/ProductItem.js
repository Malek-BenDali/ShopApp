import React from 'react';
import {StyleSheet, Text, Image, View, TouchableOpacity} from 'react-native';
import {PrimaryButton} from '../shared';
import {useNavigation} from '@react-navigation/native';

const ProductItem = ({item}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.product}>
      <Image source={{uri: item.imageUrl}} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title}>{item.title} </Text>
        <Text style={styles.price}>{item.price.toFixed(2)}€</Text>
      </View>
      <View style={styles.actions}>
        <PrimaryButton
          title="go to Details"
          onPress={() => navigation.navigate('ProductDetail')}
        />
        <PrimaryButton title="go to Cart" />
      </View>
    </View>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  product: {
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    height: 300,
    margin: 20,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '70%',
  },
  title: {
    fontSize: 18,
    marginVertical: 4,
  },
  price: {
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
});
