import { createStackNavigator, create } from '@react-navigation/stack';
import { Platform } from 'react-native';

import ShopNavigator from './ShopNavigator';
import AuthNavigator from './AuthNavigator';

const Stack = createStackNavigator();
const HomeNavigator = () => {
  isSignedIn = false;
  return (
    <>
      {isSignedIn
        ? ShopNavigator({ Screen: Stack.Screen })
        : AuthNavigator({ Screen: Stack.Screen })}
    </>
  );
};

export default HomeNavigator;
