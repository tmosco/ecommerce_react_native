import React from 'react';
import {FlatList, Text, View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';


const UserProduct = (props) => {

    const userProducts= useSelector((state) => state.products.userProducts);
    console.log(userProducts);


    return(
        <FlatList/>
    )
}
  

export default UserProduct;


const styles = StyleSheet.create({
    
})