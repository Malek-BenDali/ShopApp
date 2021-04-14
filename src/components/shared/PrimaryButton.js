import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {colors} from '../../constants';

const PrimaryButton = props => {
  return (
    <TouchableOpacity
      {...props}
      style={{...styles.buttonContainer, ...props.styles}}>
      {props.title && (
        <Text style={{...styles.textStyles, ...props.titleStyle}}>
          {props.title}
        </Text>
      )}
      {props.children}
    </TouchableOpacity>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: colors.primary,
    padding: 5,
    borderRadius: 10,
  },
  textStyles: {
    color: 'white',
  },
});
