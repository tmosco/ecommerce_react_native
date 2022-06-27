import { createStackNavigator, create } from '@react-navigation/stack';
import { Platform } from 'react-native';

import ProductOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';




import Colors from '../constants/Colors';
import { HeaderButtons ,Item } from 'react-navigation-header-buttons';

import CustomButton from '../components/UI/HeaderButton';

const Stack = createStackNavigator();
const ShopNavigator = () => {
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

export default ShopNavigator;
