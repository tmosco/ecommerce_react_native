import React, {useEffect} from 'react'
import { FlatList, StyleSheet,Text, Platform ,View} from 'react-native';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomButton from '../../components/UI/HeaderButton';

const OrderScreen = props =>{

    useEffect(() => {
        props.navigation.setOptions({
          headerLeft: () =>
          <HeaderButtons HeaderButtonComponent={CustomButton} >
          <Item
            title="Menu"
            iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
            onPress={() => {
              props.navigation.toggleDrawer();
            }}
          />
        </HeaderButtons>
          // headerLeft
        });
      }, [props]);

    const orders = useSelector((state) => state.orders.orders);
    // const ordersItems= 
    console.log(orders + "ordercde")
    return(
      <FlatList data={orders} renderItem={(itemData) =><Text>{itemData.item.id}</Text>} />

    )
}

const styles = StyleSheet.create({

});

export default OrderScreen;


