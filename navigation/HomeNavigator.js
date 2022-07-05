import { createStackNavigator, create } from '@react-navigation/stack';
import { Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import ShopNavigator from './ShopNavigator';
import AuthNavigator from './AuthNavigator';

import { authenticate } from '../reduxStore/reducers/authReducer';
import { useEffect } from 'react';

const Stack = createStackNavigator();
const HomeNavigator = () => {
  const isSignedIn = useSelector((state) => state.auth.authenticated);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authenticate());
  }, [dispatch]);

  return (
    <>
      {isSignedIn
        ? ShopNavigator({ Screen: Stack.Screen })
        : AuthNavigator({ Screen: Stack.Screen })}
    </>
  );
};

export default HomeNavigator;
