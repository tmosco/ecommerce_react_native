import { createDrawerNavigator } from '@react-navigation/drawer';
import ShopNavigator from './ShopNavigator';
import HomeNavigator from './HomeNavigator';
import CustomDrawer from '../components/UI/CustomDrawer';
import OrderNavigator from './OrderNavigator';
import UserNavigator from './UserNavigator';
import { Ionicons } from '@expo/vector-icons';

import CartScreen from '../screens/shop/CartScreen';

import Colors from '../constants/Colors';
import { Platform } from 'react-native';

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
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

export default DrawerNavigator;
