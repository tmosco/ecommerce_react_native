import React, { useEffect } from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  Button,
  StyleSheet,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../reduxStore/reducers/cartReducer';
import CustomButton from '../../components/UI/HeaderButton';

import Colors from '../../constants/Colors';

const ProductDetailScreen = (props) => {
  useEffect(() => {
    props.navigation.setOptions({
      title: props.route.params.productTitle,
    });
  }, []);

  const productId = props.route.params.productId;
  const allProducts = useSelector((state) => state.products.availableProducts);

  const product = allProducts.find((prod) => prod.id === productId);

  const dispatch = useDispatch();

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: product.imageUrl }} />
      <View style={styles.buttonContainer}>
        <Button
          color={Colors.primary}
          title="Add to Cart"
          onPress={() => {
            dispatch(addToCart(product));
          }}
        />
      </View>
      <Text style={styles.price}>{product.price.toFixed(2)}</Text>
      <Text style={styles.description}>{product.description}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
  },
  price: {
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: 'open-sans-bold',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 20,
    fontFamily: 'open-sans',
  },
  buttonContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
});
export default ProductDetailScreen;
