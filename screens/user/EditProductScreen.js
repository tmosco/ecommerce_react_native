import React, { useState, useEffect, useCallback, useReducer } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Platform,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomButton from '../../components/UI/HeaderButton';
import { useSelector, useDispatch } from 'react-redux';
import CustomInput from '../../components/UI/CustomInput';
import {
  createProduct,
  updateProduct,
} from '../../reduxStore/reducers/productReducers';

import Colors from '../../constants/Colors';
import Input from '../../components/UI/Input';
import { useForm, Controller } from 'react-hook-form';


const EditProductScreen = (props) => {
  const productId = props.route.params.productId;

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();

  const editedProduct = useSelector((state) =>
    state.products.userProducts.find((product) => productId === product.id)
  );
  const status = useSelector((state) => state.products.createStatus);
  const error = useSelector((state) => state.products.error);

  const dispatch = useDispatch();


  const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;


  // const success = () => {
  //   if (status === 'success') {
  //     props.navigation.goBack();
  //   }
  // };


  useEffect(() => {
    props.navigation.setOptions({
      title: props.route.params.productId ? 'Edit Product' : 'Add',

      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomButton}>
          <Item
            title="Add"
            iconName={
              Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'
            }
            onPress={handleSubmit}
            // onPress={onSubmit()}
          />
        </HeaderButtons>
      ),
    });
  }, []);

  if (status === 'loading') {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }



  if (error) {
    Alert.alert('An error occurred!', error, [{ text: 'Okay' }]);
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={-500}
    >
      <ScrollView>
        <View style={styles.form}>
        <CustomInput
        
        label='Title'
          name="name"
          control={control}
          placeholder="Name"
          rules={{
            required: 'Name is required',
            minLength: {
              value: 3,
              message: 'Name should be at least 3 characters long',
            },
            maxLength: {
              value: 24,
              message: 'Name should be max 24 characters long',
            },
          }}
        />

        <CustomInput
        label='ImageUrl'
          name="username"
          control={control}
          placeholder="Username"
          rules={{
            required: 'Username is required',
            minLength: {
              value: 3,
              message: 'Username should be at least 3 characters long',
            },
            maxLength: {
              value: 24,
              message: 'Username should be max 24 characters long',
            },
          }}
        />
        <CustomInput
        label='Price'
          name="email"
          control={control}
          placeholder="Email"
          rules={{
            required: 'Email is required',
            pattern: {value: EMAIL_REGEX, message: 'Email is invalid'},
          }}
        />
        <CustomInput
        label="Description"
          name="password"
          control={control}
          placeholder="Password"
          secureTextEntry
          rules={{
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password should be at least 8 characters long',
            },
          }}
        />
      
          <Controller
            control={control}
            name="title"
            render={({ field: { onChange, value, onBlur } }) => (
              <TextInput
                iconName="title"
                placeholder="Enter your name here"
                onChangeText={(value) => onChange(value)}
                value={editedProduct ? editedProduct.title : ''}
              />
            )}
          />
          <Controller
            control={control}
            name="title"
            render={({ field: { onChange, value, onBlur } }) => (
              <TextInput
                iconName="title"
                onChangeText={(value) => onChange(value)}
                value={editedProduct ? editedProduct.title : ''}
              />
            )}
          />
          <Controller
            control={control}
            name="imageUrl"
            render={({ field: { onChange, value, onBlur } }) => (
              <TextInput
                onChangeText={(value) => onChange(value)}
                value={editedProduct ? editedProduct.imageUrl : ''}
              />
            )}
          />
          {/* {editedProduct ? null : (
            <Controller
              control={control}
              name="price"
              render={({ field: { onChange, value, onBlur } }) => (
                <TextInput
                  onChangeText={(value) => onChange(value)}
                  value={editedProduct ? editedProduct.price : ''}
                />
              )}
            />
          )} */}
          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, value, onBlur } }) => (
              <TextInput
                onChangeText={(value) => onChange(value)}
                value={editedProduct ? editedProduct.description : ''}
              />
            )}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  formControl: {
    width: '100%',
  },
  label: { fontFamily: 'open-sans-bold', marginVertical: 8 },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EditProductScreen;
