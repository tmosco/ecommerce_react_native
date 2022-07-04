import React, { useEffect } from 'react';
import { FlatList, Text, View, StyleSheet, Button, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { deleteProduct, fetchAllProduct } from '../../reduxStore/reducers/productReducers';

import CustomButton from '../../components/UI/HeaderButton';

import ProductItem from '../../components/shop/ProductItem';

import Colors from '../../constants/Colors';

const UserProductScreen = (props) => {
  const dispatch = useDispatch();

  const loadProducts = () => {
    dispatch(fetchAllProduct());
  };

  useEffect(() => {
    loadProducts();
  }, [dispatch]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener('focus', loadProducts);
    return willFocusSub;
  }, [loadProducts]);
  



  useEffect(() => {
    props.navigation.setOptions({
      // title: getMeal, .title,
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={CustomButton}>
          <Item
            title="Menu"
            iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
            onPress={() => {
              props.navigation.toggleDrawer();
            }}
          />
        </HeaderButtons>
      ),
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomButton}>
          <Item
            title="Add"
            iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
            onPress={() => {
              props.navigation.navigate('EditProduct', {});
            }}
          />
        </HeaderButtons>
      ),
    });
  }, []);
  

  const userProducts = useSelector((state) => state.products.userProducts);
  const deleteHandler = (id) => {
    Alert.alert('Are you sure?', 'Do you really want to delete product', [
      { text: 'NO', style: 'default' },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => dispatch(deleteProduct({id})),
      },
    ]);
  };

  const editProductHandler = (id) => {
    props.navigation.navigate('EditProduct', {
      productId: id,
      // productTitle: title,
    });
  };

  if(userProducts.length === 0 ){
    return <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
      <Text>No Products </Text>
    </View>
  }

  return (
    <FlatList
      data={userProducts}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          title={itemData.item.title}
          price={itemData.item.price}
          image={itemData.item.imageUrl}
        >
          <Button
            color={Colors.secondary}
            title="Edit Product"
            onPress={() => {
              editProductHandler(itemData.item.id);
            }}
          />
          <Button
            color="red"
            title="Delete"
            onPress={() => {
              deleteHandler(itemData.item.id);
            }}
          />
        </ProductItem>
      )}
    />
  );
};

export default UserProductScreen;
