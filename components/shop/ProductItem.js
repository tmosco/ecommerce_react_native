import React from 'react';
import { Text, View, Image, Button, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

const ProductItem = (props) => {
  return (
    <View style={styles.product}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: props.image }} />
      </View>
      <View style={styles.text}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.price}>${props.price}</Text>
      </View>
      <View style={styles.button}>
        <Button
          color={Colors.primary}
          title="View Details"
          onPress={props.onViewDetail}
        />
        <Button
          color={Colors.primary}
          title="To Cart"
          onPress={props.onAddToCart}
        />
      </View>
    </View>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  product: {
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    height: 300,
    margin: 20,
  },
  text: {
    alignItems: 'center',
    height: '15%',
    padding: 5,
  },
  imageContainer: {
    width: '100%',
    height: '60%',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    overflow:'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '25%',
    paddingHorizontal: 20,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    marginVertical: 4,
  },
  price: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
  },
});
