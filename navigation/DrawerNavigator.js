import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {
  ProductNavigator,
  OrderNavigator,
  AdminNavigator,
} from './ShopNavigator';

import { Ionicons } from '@expo/vector-icons';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { logout } from '../reduxStore/reducers/authReducer';

import Colors from '../constants/Colors';
import { Platform } from 'react-native';
import { color } from 'react-native-reanimated';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  const dispatch = useDispatch();

  return (
    //   <View style={{ flex: 1, paddingTop: 20 }}>
    //   <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
    //     <DrawerItemList {...props} />
    //     <Button
    //       title="Logout"
    //       color={Colors.primary}
    //       onPress={() => {
    //         dispatch(logout())
    //       }}
    //     />
    //   </SafeAreaView>
    // </View>
    // );

    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            // padding: 20,
            backgroundColor: '#f6f6f6',
            // marginBottom: 20,
          }}
        >
          <View>
            <View style={styles.logo}>
              <Text style={styles.text}>My Shop</Text>
            </View>
          </View>
        </View>
        <View>
          <DrawerItemList {...props} />
          <View style={styles.button}>
            <Button
              title="Logout"
              color={Colors.primary}
              onPress={() => {
                dispatch(logout());
              }}
            />
          </View>
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: Colors.primary,
        drawerLabelStyle: {
          fontFamily: 'open-sans-bold',
        },
      }}
    >
      <Drawer.Screen
        name="All Products"
        component={ProductNavigator}
        options={{
          title: 'Product',
          drawerIcon: (drawerConfig) => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
              size={23}
              color={drawerConfig.drawerActiveTintColor}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Order"
        component={OrderNavigator}
        options={{
          title: 'Orders',
          drawerIcon: (drawerConfig) => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
              size={23}
              color={drawerConfig.drawerActiveTintColor}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Admin"
        component={AdminNavigator}
        options={{
          title: 'Admin',
          drawerIcon: (drawerConfig) => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
              size={23}
              color={drawerConfig.drawerActiveTintColor}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;

const styles = StyleSheet.create({
  logo: {
    flex: 1,
    backgroundColor: Colors.primary,
    width: 300,
    height: 50,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontFamily: 'open-sans-bold',
  },
  button: {
    marginTop: 50,
  },
});
