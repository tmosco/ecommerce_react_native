import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomButton from '../../components/UI/HeaderButton';
import { useSelector, useDispatch } from 'react-redux';
import {
  CreateProduct,
  updateProduct,
} from '../../reduxStore/reducers/productReducers';

import { useForm, Controller } from 'react-hook-form';
import Colors from '../../constants/Colors';

const EditProductScreen = (props) => {
  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  // const [status, setStatus] = useState(useSelector((state) => state.products.createStatus))
  // const [error, setError] = useState(useSelector((state) => state.products.error))

  const productId = props.route.params.productId;

  const editedProduct = useSelector((state) =>
    state.products.userProducts.find((product) => productId === product.id)
  );
  const status = useSelector((state) => state.products.createStatus);
  const error = useSelector((state) => state.products.error);

  const dispatch = useDispatch();

  console.log(status);

  useEffect(() => {
    submitHandler;
  }, [status]);

  const success = () => {
    if (status === 'success') {
      props.navigation.goBack();
    }
  };

  const submitHandler = async (data) => {
    try {
      if (productId) {
        await dispatch(
          updateProduct({
            id: productId,
            title: data.title,
            imageUrl: data.imageUrl,
            description: data.description,
          })
        );
      } else {
        await dispatch(
          CreateProduct({
            title: data.title,
            imageUrl: data.imageUrl,
            description: data.description,
            price: parseFloat(data.price),
          })
        );
        props.navigation.goBack();
      }
    } catch (err) {
      console.log(err.message);
    }
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
            onReset={reset}
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
                defaultValue={editedProduct ? editedProduct.title : value}
                autoCapitalize="sentences"
                autoCorrect
                returnKeyType="next"
                value={value}
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
                defaultValue={editedProduct ? editedProduct.imageUrl : value}
                value={value}
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
                defaultValue={editedProduct ? editedProduct.description : value}
                value={value}
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
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EditProductScreen;
