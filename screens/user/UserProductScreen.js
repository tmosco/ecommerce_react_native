import React, { useEffect } from 'react';
import { FlatList, Text, View, StyleSheet, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { deleteProduct } from '../../reduxStore/reducers/productReducers';


import CustomButton from '../../components/UI/HeaderButton';

import ProductItem from '../../components/shop/ProductItem';

import Colors from '../../constants/Colors';

const UserProductScreen = (props) => {

  const dispatch = useDispatch();


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
    });
  }, []);

  const userProducts = useSelector((state) => state.products.userProducts);

  const SelectHandler = (id, title) => {
    props.navigation.navigate('ProductDetail', {
      productId: id,
      productTitle: title,
    });
  };

  return (
    <FlatList
      data={userProducts}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          title={itemData.item.title}
          price={itemData.item.price.toFixed(2)}
          image={itemData.item.imageUrl}
        >
          <Button
            color={Colors.secondary}
            title="Edit Product"
            onPress={() => {
              SelectHandler();
            }}
          />
          <Button
            color="red"
            title="Delete"
            onPress={() => dispatch(deleteProduct(itemData.item.id))}
          />
        </ProductItem>
      )}
    />
  );
};

export default UserProductScreen;
