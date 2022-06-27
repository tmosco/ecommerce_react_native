import { createStackNavigator } from '@react-navigation/stack';
import { Platform } from 'react-native';

import AuthScreen from '../screens/user/AuthScreen';


import Colors from '../constants/Colors';


const Stack = createStackNavigator();
const AuthNavigator = () => {
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

export default AuthNavigator;
