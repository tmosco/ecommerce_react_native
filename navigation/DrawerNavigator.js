import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import ShopNavigator from './ShopNavigator';
import HomeNavigator from './HomeNavigator';
import CustomDrawer from '../components/UI/CustomDrawer';
import OrderNavigator from './OrderNavigator';
import UserNavigator from './UserNavigator';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../reduxStore/reducers/authReducer';


import CartScreen from '../screens/shop/CartScreen';

import Colors from '../constants/Colors';
import { Platform } from 'react-native';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  const dispatch = useDispatch();

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <View style={styles.logout}>
      <DrawerItem
      color={Colors.primary}
      labelStyle={{fontSize:26}}
        label="Logout"
        onPress={() => {dispatch(logoutUser()); props.navigation.navigate('Login')}}
        style={{ color: Colors.primary, flex: 1 }}
      />
    </View>
    </DrawerContentScrollView>
  );
};

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{        headerShown: false,
        headerTitle: 'Your Orders',
        drawerActiveTintColor: Colors.primary,
        drawerLabelStyle: {
          fontFamily: 'open-sans-bold',
        },
      }}
    >
      <Drawer.Screen
        name="All Products"
        component={HomeNavigator}
        options={{
          title: 'Product',
          drawerIcon: (drawerConfig) => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
              size={23}
              color={drawerConfig.drawerActiveTintColor}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Order"
        component={OrderNavigator}
        options={{
          title: 'Orders',
          drawerIcon: (drawerConfig) => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
              size={23}
              color={drawerConfig.drawerActiveTintColor}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="User"
        component={UserNavigator}
        options={{
          title: 'Admin',
          drawerIcon: (drawerConfig) => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
              size={23}
              color={drawerConfig.drawerActiveTintColor}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
const styles = StyleSheet.create({
  logout:{
    flex:1,
    color:'red'
    
  }
});
export default DrawerNavigator;
