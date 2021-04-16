import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Card = props => {
  return (
    <View style={{...styles.card, ...props.styles}}>{props.children}</View>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 10,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    overflow: 'hidden',
  },
});
