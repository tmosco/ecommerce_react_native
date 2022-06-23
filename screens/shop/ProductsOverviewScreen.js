import React, { useState, useEffect } from 'react';
import {
  FlatList,
  Text,
  Platform,
  StyleSheet,
  Button,
  View,
  ActivityIndicator,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { addToCart } from '../../reduxStore/reducers/cartReducer';
import CustomButton from '../../components/UI/HeaderButton';
import { fetchAllProduct } from '../../reduxStore/reducers/productReducers';

import Colors from '../../constants/Colors';

const ProductOverviewScreen = (props) => {
  const allProducts = useSelector((state) => state.products.availableProducts);
  const status = useSelector((state) => state.products.status);
  const cart = useSelector((state) => state.cart.numOfItem);

  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const loadProducts = () => {
    dispatch(fetchAllProduct());
  };

  useEffect(() => {
    if (status === 'loading') {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [status]);

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
      headerRight: () => (
        <HeaderButtons
          HeaderButtonComponent={CustomButton}
          style={styles.headerButtkon}
        >
          <Item
            title="Cart"
            iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
            onPress={() => {
              props.navigation.navigate('Cart');
            }}
          />
          <Item title={cart} style={styles.headerButton} />
        </HeaderButtons>
      ),
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
      // headerLeft
    });
  }, [cart]);

  const SelectHandler = (id, title) => {
    props.navigation.navigate('ProductDetail', {
      productId: id,
      productTitle: title,
    });
  };

  if (status === 'loading') {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (status === 'loading ' && allProducts.length === 0) {
    return (
      <View style={styles.loading}>
        <Text>No Product Found!</Text>
      </View>
    );
  }
  if (status === 'failed') {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong!</Text>
        <Button color={Colors.primary} title="Refresh" onPress={loadProducts} />
      </View>
    );
  }

  return (
    <FlatList
      onRefresh={loadProducts}
      refreshing={isLoading}
      data={allProducts}
      renderItem={(itemData) => (
        <ProductItem
          title={itemData.item.title}
          price={itemData.item.price}
          image={itemData.item.imageUrl}
          onSelect={() => {
            SelectHandler(itemData.item.id, itemData.item.title);
          }}
        >
          <Button
            color={Colors.primary}
            title="View Details"
            onPress={() => {
              SelectHandler(itemData.item.id, itemData.item.title);
            }}
          />
          <Button
            color={Colors.primary}
            title="To Cart"
            onPress={() => dispatch(addToCart(itemData.item))}
          />
        </ProductItem>
      )}
    />
  );
};

export default ProductOverviewScreen;

const styles = StyleSheet.create({
  headerButton: {
    margin: 1,
    padding: 1,
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
