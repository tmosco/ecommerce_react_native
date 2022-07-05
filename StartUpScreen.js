import React, { useEffect } from 'react';
import { createStackNavigator, create } from '@react-navigation/stack';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import Colors from './constants/Colors';
import AuthNavigator from './navigation/AuthNavigator';

const StartUpScreen = (props) => {
  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('userData');
      if (!userData){
        AuthNavigator({ Screen: Stack.Screen })
      }
      const transformedData = JSON.parse(userData);
    };
    tryLogin();
  }, []);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
