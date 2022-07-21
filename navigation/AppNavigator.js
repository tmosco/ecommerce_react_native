import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

// import  from '../navigation/DrawerNavigator'
import DrawerNavigator from './DrawerNavigator';
// import StartupScreen from '../screens/StartupScreen';
import StartupScreen from '../screens/startupScreen';
import { AuthNavigator } from './ShopNavigator';

const AppNavigator = (props) => {
  const isAuth = useSelector((state) => state.auth.token);
  //   const isAuth = false
  const didTryAutoLogin = useSelector((state) => state.auth.authenticated);
  //   const didTryAutoLogin = true
  console.log(isAuth, didTryAutoLogin);

  return (
    <NavigationContainer>
      {isAuth && <DrawerNavigator />}
      {!isAuth && didTryAutoLogin && <AuthNavigator />}
      {!isAuth && !didTryAutoLogin && <StartupScreen />}
    </NavigationContainer>
  );
};

export default AppNavigator;
