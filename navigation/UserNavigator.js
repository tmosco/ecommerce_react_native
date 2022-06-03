import { createStackNavigator } from '@react-navigation/stack';
import { Platform } from 'react-native';

import UserProductScreen from '../screens/user/UserProductScreen';


import Colors from '../constants/Colors';
import { HeaderButtons ,Item } from 'react-navigation-header-buttons';

import CustomButton from '../components/UI/HeaderButton';

const Stack = createStackNavigator();
const UserNavigator = () => {
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

    </Stack.Navigator>
  );
};

export default UserNavigator;
