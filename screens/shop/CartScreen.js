import React from 'react';
import { Text, View, Button, FlatList, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';
import CartItem from '../../components/shop/CartItem';
import { removeFromCart } from '../../reduxStore/reducers/cartReducer';
import { addOrder } from '../../reduxStore/reducers/orderReducer';

const CartScreen = (props) => {
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);

  const dispatch = useDispatch();
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
  console.log(cartItems + ' order')

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{' '}
          <Text style={styles.summaryPrice}>${cartTotalAmount.toFixed(2)}</Text>
        </Text>

        <Button
          color={Colors.secondary}
          title="Order Now"
          disabled={cartItems.length === 0}
          onPress={() => {
            dispatch(addOrder({items:cartItems,amount:cartTotalAmount}));
          }}
        />
      </View>
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
      {/* <View>
        {cartItems.map((item) => (
            <View>
          <Text>{item.productTitle}</Text>
          <Text>{item.productPrice}</Text>
          <Text>{item.quantity}</Text>
          </View>
        ))} */}
      {/* </View> */}
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
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  summaryPrice: { color: Colors.primary },
  summaryText: { fontFamily: 'open-sans-bold', fontSize: 18 },
});
export default CartScreen;
