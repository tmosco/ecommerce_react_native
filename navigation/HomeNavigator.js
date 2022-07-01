import { createStackNavigator, create } from '@react-navigation/stack';
import { Platform } from 'react-native';
import { useSelector } from 'react-redux';

import ShopNavigator from './ShopNavigator';
import AuthNavigator from './AuthNavigator';

const Stack = createStackNavigator();
const HomeNavigator = () => {
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);
  return (
    <>
      {isSignedIn
        ? ShopNavigator({ Screen: Stack.Screen })
        : AuthNavigator({ Screen: Stack.Screen })}
    </>
  );
};

export default HomeNavigator;
