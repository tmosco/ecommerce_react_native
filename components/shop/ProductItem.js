import React from 'react';
import {
  Text,
  View,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';

const ProductItem = (props) => {
  const TouchableCmp =
    Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
  return (
    <View style={styles.product}>
      <View style={styles.touchable}>
        <TouchableCmp onPress={props.onViewDetail} useForeground>
          <View>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: props.image }} />
            </View>
            <View style={styles.text}>
              <Text style={styles.title}>{props.title}</Text>
              <Text style={styles.price}>${props.price}</Text>
            </View>
            <View style={styles.button}>{props.children}</View>
          </View>
        </TouchableCmp>
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
  touchable: {
    borderRadius: 10,
    overflow: 'hidden',
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
    overflow: 'hidden',
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
    fontFamily: 'open-sans-bold',
  },
  price: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
    fontFamily: 'open-sans',
  },
});
