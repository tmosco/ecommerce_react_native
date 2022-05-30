import React, { useEffect } from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  Button,
  StyleSheet,
} from 'react-native';
import { useSelector } from 'react-redux';

const ProductDetailScreen = (props) => {
  useEffect(
    () => {
      props.navigation.setOptions({
        title: props.route.params.productTitle,
      });
    },
    []
  );

  const productId = props.route.params.productId;
  const allProducts = useSelector((state) => state.products.availableProducts);

  const product = allProducts.find((prod) => prod.id === productId);

  return (
    <View>
      <Text>{product.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});
export default ProductDetailScreen;
