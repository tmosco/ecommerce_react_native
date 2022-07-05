import React, { useState } from 'react';

import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import store from './reduxStore/store';
import { NavigationContainer } from '@react-navigation/native';
import AppLoading  from 'expo-app-loading';
import * as Font from 'expo-font';
import 'react-native-gesture-handler';


import DrawerNavigator from './navigation/DrawerNavigator';

import 'react-native-gesture-handler';
import AppNavigator from './navigation/AppNavigator';

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
        onError={(err)=>{console.log(err)}}
      />
    );
  }
  return (
    <Provider store={store}>
     <AppNavigator/>
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
