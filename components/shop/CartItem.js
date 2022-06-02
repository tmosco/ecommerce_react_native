import React from 'react';
import { View, StyleSheet, TouchableOpacity, Platform , Text} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CartItem = (props) => {
  return (
    <View style={styles.cartItem}>
      <View style={styles.cartData}>
        <Text style={styles.quantity}>{props.quantity}</Text>
        <Text style={styles.mainText}>{props.title}</Text>
      </View>
      <View style={styles.cartData}>
        <Text style={styles.mainText}>${props.amount}</Text>
        {props.deleteIcon && <TouchableOpacity onPress={props.onRemove} style={styles.deleteButton}>
          <Ionicons
            name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
            size={23}
            color="red"
          />
        </TouchableOpacity>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    padding: 8,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  cartData: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity: {
    fontFamily: 'open-sans',
    color: '#888',
    fontSize: 16,
    marginRight:10
  },
  mainText: {
    fontFamily: 'open-sans-bold',
    // color: '#888',
    fontSize: 16,
  },

  deleteButton: { marginLeft: 20 },
});

export default CartItem
