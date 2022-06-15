import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomButton from '../../components/UI/HeaderButton';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchCreateProduct,
  fetchAllProduct,
} from '../../reduxStore/reducers/productReducers';
import {
  createProduct,
  updateProduct,
} from '../../reduxStore/reducers/productReducers';
import { useForm, Controller } from 'react-hook-form';

const EditProductScreen = (props) => {
  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const productId = props.route.params.productId;

  const editedProduct = useSelector((state) =>
    state.products.userProducts.find((product) => productId === product.id)
  );

  const dispatch = useDispatch();

  // function onSubmit() {
  //   dispatch(fetchAllProduct());
  // }

  const submitHandler = (data) => {
    if (productId) {
      dispatch(
        updateProduct({
          id: productId,
          title: data.title,
          imageUrl: data.imageUrl,
          description: data.description,
        })
      );
    } else {
      dispatch(
        fetchCreateProduct({
          title: data.title,
          imageUrl: data.imageUrl,
          description: data.description,
          price: parseFloat(data.price),
        })
      );
    }
    props.navigation.goBack();
  };

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

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onChangeText={(value) => onChange(value)}
                value={editedProduct ? editedProduct.title : value}
                autoCapitalize="sentences"
                autoCorrect
                returnKeyType="next"
                // onEndEditing={() => console.log('onendEdidi')}
                // onSubmitEditing={() => console.log('onendEdidi')}
              />
            )}
            name="title"
            rules={{ required: true }}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image URL</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onChangeText={(value) => onChange(value)}
                value={editedProduct ? editedProduct.imageUrl : value}
              />
            )}
            name="imageUrl"
            rules={{ required: true }}
          />
        </View>
        {editedProduct ? null : (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  keyboardType="decimal-pad"
                />
              )}
              name="price"
              rules={{ required: true }}
            />
          </View>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onChangeText={(value) => onChange(value)}
                value={editedProduct ? editedProduct.description : value}
              />
            )}
            name="description"
            rules={{ required: true }}
          />
        </View>
      </View>
    </ScrollView>
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
});

export default EditProductScreen;
