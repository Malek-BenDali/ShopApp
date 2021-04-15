import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
const CartItem = ({item, onRemove}) => {
  return (
    <View style={styles.cartItem}>
      <View style={styles.itemData}>
        <Text style={styles.quantity}>{item.quantity}</Text>
        <Text style={styles.mainText}>{item.productTitle}</Text>
      </View>
      <View style={styles.itemData}>
        <Text style={styles.mainText}>
          {parseFloat(item.total).toFixed(2)}€
        </Text>
        {onRemove && (
          <TouchableOpacity onPress={onRemove} style={styles.deleteButton}>
            <Ionicons name="md-trash" size={23} color="red" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  cartItem: {
    padding: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  itemData: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity: {
    fontFamily: 'OpenSans-Regular',
    color: '#888',
    fontSize: 16,
  },
  mainText: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 16,
    marginLeft: 5,
  },
  deleteButton: {
    marginLeft: 20,
  },
});
