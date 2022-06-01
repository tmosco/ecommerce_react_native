import React from 'react';
import { Text, View, StyleSheet, Image, ImageBackground } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import Colors from '../../constants/Colors';

const CustomDrawer = (props) => {
  return (
    <View style={styles.screen}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: Colors.primary }}
      >
            <View style={styles.list}>

        <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View>
        <Text>Our Text</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  list:{
      flex: 1,
      backgroundColor:'#f6f6f6',
      padding: 5,
  
  }
});

export default CustomDrawer;
