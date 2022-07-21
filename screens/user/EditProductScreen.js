import React, { useState, useEffect, useCallback, useRef } from 'react';
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

  const submitHandler = (data) => {
    console.log(data);
    const { title, imageUrl, price, description } = data;

    try {
      if (editedProduct) {
        dispatch(
          updateProduct({
            id: productId,
            title: title,
            imageUrl: imageUrl,
            description: description,
          })
        );
      } else {
        dispatch(
          createProduct({
            title: title,
            imageUrl: imageUrl,
            description: description,
            price: parseFloat(price),
          })
        );
      }
      props.navigation.goBack();
    } catch (err) {
      console.log(err.message);
    }
  };

  //   } catch (e) {
  //     Alert.alert('Oops', e.message);
  //   }
  // };

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
            onPress={handleSubmit(submitHandler)}
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
            label="Title"
            name="title"
            control={control}
            defaultValue={editedProduct ? editedProduct.title : ''}
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
            label="ImageUrl"
            name="imageUrl"
            control={control}
            defaultValue={editedProduct ? editedProduct.imageUrl : ''}
            rules={{
              required: 'ImageUrl is required',
              minLength: {
                value: 3,
                message: 'ImageUrl should be at least 3 characters long',
              },
              // pattern: {value: EMAIL_REGEX, message: 'Email is invalid'},
            }}
          />

          {editedProduct ? null : (
            <CustomInput
              label="Price"
              name="price"
              control={control}
              defaultValue={editedProduct ? editedProduct.price : ''}
              rules={{
                required: 'Price is required',
              }}
            />
          )}
          <CustomInput
            label="Description"
            name="description"
            control={control}
            defaultValue={editedProduct ? editedProduct.description : ''}
            rules={{
              required: 'Description is required',
            }}
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
