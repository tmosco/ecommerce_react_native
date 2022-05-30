import React from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';

const ProductOverviewScreen = (props) => {
  const allProducts = useSelector((state) => state.products.availableProducts);

  return (
    <FlatList
      data={allProducts}
      renderItem={(itemData) => (
        <ProductItem
          title={itemData.item.title}
          price={itemData.item.price.toFixed(2)}
          image={itemData.item.imageUrl}
          onViewDetail={() =>(console.log)}
          onAddToCart={() =>(console.log)}
        />
      )}
    />
  );
};

export default ProductOverviewScreen;

const styles = StyleSheet.create({});
