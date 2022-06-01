import { createStackNavigator } from '@react-navigation/stack';
import { Platform } from 'react-native';

import OrderScreen from '../screens/shop/OrdersScreen';


import Colors from '../constants/Colors';


const Stack = createStackNavigator();
const OrderNavigator = () => {
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

export default OrderNavigator;
