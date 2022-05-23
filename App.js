import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import store from './reduxStore/store';
import { NavigationContainer } from '@react-navigation/native';

import ShopNavigator from './navigation/ShopNavigator';

import 'react-native-gesture-handler';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <ShopNavigator />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
