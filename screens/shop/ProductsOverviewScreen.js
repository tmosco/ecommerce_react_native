import React, { useEffect } from 'react';
import { FlatList, Text, Platform, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { addToCart } from '../../reduxStore/reducers/cartReducer';
import CustomButton from '../../components/UI/HeaderButton';

const ProductOverviewScreen = (props) => {
  const allProducts = useSelector((state) => state.products.availableProducts);
  const cart = useSelector((state) => state.cart.numOfItem);



  const dispatch = useDispatch();


  useEffect(() => {
    props.navigation.setOptions({
      // title: getMeal, .title,
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomButton} style={styles.headerButtkon}>
          <Item
            title="Cart"
            iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
            onPress={() => {
              props.navigation.navigate('Cart');
            }}
          />
          <Item 
          title={cart}
          style={styles.headerButton}
          />
        </HeaderButtons>
      ),
      headerLeft: () =>
      <HeaderButtons HeaderButtonComponent={CustomButton} >
      <Item
        title="Menu"
        iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
        onPress={() => {
          props.navigation.toggleDrawer();
        }}
      />
    </HeaderButtons>
      // headerLeft
    });
  }, [cart]);

  return (
    <FlatList
      data={allProducts}
      renderItem={(itemData) => (
        <ProductItem
          title={itemData.item.title}
          price={itemData.item.price.toFixed(2)}
          image={itemData.item.imageUrl}
          onAddToCart={() => dispatch(addToCart(itemData.item))}
          onViewDetail={() => {
            props.navigation.navigate('ProductDetail', {
              productId: itemData.item.id,
              productTitle: itemData.item.title,
            });
          }}
        />
      )}
    />
  );
};

export default ProductOverviewScreen;

const styles = StyleSheet.create({
  headerButton:{
    margin:1,
    padding: 1,
  }
});
