import React from 'react';
import {
  Text,
  View,
  Button,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';
import CartItem from '../../components/shop/CartItem';
import {
  removeFromCart,
  clearCart,
} from '../../reduxStore/reducers/cartReducer';
import { createOrder } from '../../reduxStore/reducers/orderReducer';

import Card from '../../components/UI/Card';

const CartScreen = (props) => {
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const status = useSelector((state) => state.orders.status);

  const dispatch = useDispatch();
  const submitHandler = () => {
    dispatch(
      createOrder({ cartItems: cartItems, totalAmount: cartTotalAmount })
    );
    dispatch(clearCart());
  };

  const cartItems = useSelector((state) => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        productSum: state.cart.items[key].sum,
      });
    }
    return transformedCartItems.sort((a, b) =>
      a.productId > b.productId ? 1 : -1
    );
  });


  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{' '}
          <Text style={styles.summaryPrice}>
            ${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}
          </Text>
        </Text>

        {status === 'loading' ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <Button
            color={Colors.secondary}
            title="Order Now"
            disabled={cartItems.length === 0}
            onPress={submitHandler}
          />
        )}
      </Card>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.productId}
        renderItem={(itemData) => (
          <CartItem
            quantity={itemData.item.quantity}
            price={itemData.item.productPrice.toFixed(2)}
            amount={itemData.item.productSum.toFixed(2)}
            onRemove={() => dispatch(removeFromCart(itemData.item))}
            title={itemData.item.productTitle.substring(0, 16)}
            deleteIcon
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10,
  },
  summaryPrice: { color: Colors.primary },
  summaryText: { fontFamily: 'open-sans-bold', fontSize: 18 },

});

export default CartScreen;
