import React, { useEffect } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  Platform,
  View,
  Alert,
  ActivityIndicator
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomButton from '../../components/UI/HeaderButton';
import OrderItem from '../../components/shop/OrderItem';
import { fetchAllOrders } from '../../reduxStore/reducers/orderReducer';
import Colors from '../../constants/Colors';

const OrderScreen = (props) => {
  useEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={CustomButton}>
          <Item
            title="Menu"
            iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
            onPress={() => {
              props.navigation.toggleDrawer();
            }}
          />
        </HeaderButtons>
      ),
      // headerLeft
    });
  }, [props]);

  const orders = useSelector((state) => state.orders.orders);
  const status = useSelector((state) => state.orders.status);
  const error = useSelector((state) => state.orders.error);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  if (error) {
    Alert.alert('An error occurred!', error, [{ text: 'Okay' }]);
  }

  if (status === 'loading') {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if(orders.length === 0 ){
    return <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
      <Text>No Orders </Text>
    </View>
  }

  return (
    <FlatList
      data={orders}
      renderItem={(itemData) => (
        <OrderItem
          amount={itemData.item.totalAmount}
          date={itemData.item.readableDate}
          items={itemData.item.items}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OrderScreen;
