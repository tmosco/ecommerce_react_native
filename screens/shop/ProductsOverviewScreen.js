import React from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

const ProductOverviewScreen = (props) => {
  const allProducts = useSelector((state) => state.products.availableProducts);

  return (
    <FlatList
      data={allProducts}
      renderItem={(itemData) => <Text>{itemData.item.title}</Text>}
    />
  );
};

export default ProductOverviewScreen;

const styles = StyleSheet.create({});
