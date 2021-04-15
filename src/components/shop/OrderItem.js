import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {PrimaryButton} from '../shared';
import CartItem from './CartItem';

const OrderItem = ({item}) => {
  const [showDetail, setShowDetail] = useState(false);
  return (
    <View style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.total}>
          {parseFloat(item.totalAmount).toFixed(2)}€
        </Text>
        <Text style={styles.date}>{item.date} </Text>
      </View>
      <PrimaryButton
        title="Show Details"
        onPress={() => setShowDetail(prevState => !prevState)}
      />
      {showDetail && (
        <View>
          {item.items.map(item => (
            <CartItem item={item} />
          ))}
        </View>
      )}
    </View>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  orderItem: {
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    margin: 20,
    overflow: 'hidden',
    padding: 10,
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  totalAmount: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 16,
  },
  date: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 16,
    color: '#888',
  },
});
