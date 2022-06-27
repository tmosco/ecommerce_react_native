import React, { useState } from 'react';
import { Header } from '@react-navigation/stack';
import {
  ScrollView,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Text,
  TextInput,
  Button,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';

const AuthScreen = (props) => {
  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={-500}
      style={styles.screen}
    >
      <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <Input
              id="email"
              label="Email"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorMessage="Please enter a valid email address."
              onInputChange={() => {}}
              initialValue=""
            />
            <Input
              id="password"
              label="Password"
              keyboardType="default"
              securedTextEntry
              required
              minLength={5}
              autoCapitalize="none"
              errorMessage="Please enter a valid password."
              onInputChange={() => {}}
              initialValue="hhh"
            />
            <View style={styles.button}>
              <Button title="Login" color={Colors.primary} onPress={() => {}} />
            </View>
            <View style={styles.button}>
              <Button
                title="SignUp"
                color={Colors.secondary}
                onPress={() => {}}
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  authContainer: { width: '80%', maxWidth: 400, maxHeight: 900, padding: 20 },
  button: { margin: 10 },
  gradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginTop: 10,
  },
});
export default AuthScreen;
