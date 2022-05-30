import { createStackNavigator } from '@react-navigation/stack';
import { Platform } from 'react-native';

import ProductOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import UserProduct from '../screens/user/UserProduct';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';

import Colors from '../constants/Colors';

const Stack = createStackNavigator();
const ShopNavigator = () =>  {
  return (
    <Stack.Navigator screenOptions={{
        headerStyle:{
            backgroundColor: Platform.OS ==='android' ? Colors.primary : ''
        },
        headerTintColor:Platform.OS === 'android' ? 'white' : Colors.primary

    }}>
      <Stack.Screen name="ProductsOverview" component={ProductOverviewScreen} />
      <Stack.Screen name="UserProduct" component={UserProduct} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />

    </Stack.Navigator>
  );
}

export default ShopNavigator;