import { createStackNavigator, create } from '@react-navigation/stack';
import { Platform } from 'react-native';

import ProductOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import AuthScreen from '../screens/user/AuthScreen';
import OrderScreen from '../screens/shop/OrdersScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import UserProductScreen from '../screens/user/UserProductScreen';





import Colors from '../constants/Colors';
import { HeaderButtons ,Item } from 'react-navigation-header-buttons';

import CustomButton from '../components/UI/HeaderButton';

const Stack = createStackNavigator();
export const ProductNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
        },
        headerTitleStyle: {
          fontFamily: 'open-sans-bold',
        },
        headerBackTitleStyle: {
          fontFamily: 'open-sans-bold',
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
      
      }}
      
    >
      
      <Stack.Screen name="ProductsOverview" component={ProductOverviewScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
    </Stack.Navigator>
  );
};

 export const OrderNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
        },
        headerTitleStyle: {
          fontFamily: 'open-sans-bold',
        },
        headerBackTitleStyle: {
          fontFamily: 'open-sans-bold',
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
      
      }}
      
    >

      <Stack.Screen name="Order" component={OrderScreen} />
    </Stack.Navigator>
  );
};

export const AdminNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
        },
        headerTitleStyle: {
          fontFamily: 'open-sans-bold',
        },
        headerBackTitleStyle: {
          fontFamily: 'open-sans-bold',
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
      
      }}
      
    >

      <Stack.Screen name="UserProduct" component={UserProductScreen} options={{title:'Your Products'}} />
      <Stack.Screen name="EditProduct" component={EditProductScreen} options={{title:'Your Product'}} />

    </Stack.Navigator>
  );
};

export const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
        },
        headerTitleStyle: {
          fontFamily: 'open-sans-bold',
        },
        headerBackTitleStyle: {
          fontFamily: 'open-sans-bold',
        },
        headerTitleAlign:'center',
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
      
      }}
      
    >

      <Stack.Screen name="Login" component={AuthScreen} />
    </Stack.Navigator>
  );
};


