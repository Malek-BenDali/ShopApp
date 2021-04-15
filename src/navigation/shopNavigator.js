import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {
  CartScreen,
  OrdersScreen,
  ProductDetailScreen,
  ProductOverViewScreen,
} from '../screens/shop';
import {EditProductScreen, UsersProductsScreen} from '../screens/users';
import {colors} from '../constants';
import {Platform} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const screenOptions = {
  headerTintColor: 'white',
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? colors.primary : 'white',
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : colors.primary,
  headerTitleStyle: {
    fontFamily: 'OpenSans-Bold',
  },
};

const ShopStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="ProductOverview"
      screenOptions={screenOptions}>
      <Stack.Screen name="ProductOverview" component={ProductOverViewScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
    </Stack.Navigator>
  );
};

const OrdersNavigator = () => (
  <Stack.Navigator screenOptions={screenOptions}>
    <Stack.Screen name="Orders" component={OrdersScreen} />
  </Stack.Navigator>
);

const AdminNavigator = () => (
  <Stack.Navigator screenOptions={screenOptions}>
    <Stack.Screen name="UserProduct" component={UsersProductsScreen} />
    <Stack.Screen name="EditProduct" component={EditProductScreen} />
    <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
  </Stack.Navigator>
);

const shopNavigator = () => (
  <NavigationContainer>
    <Drawer.Navigator
      drawerContentOptions={{
        activeTintColor: colors.primary,
      }}>
      <Drawer.Screen
        name="Shop"
        component={ShopStack}
        options={{
          drawerIcon: drawerConfig => (
            <Ionicons name="ios-cart" size={23} color={drawerConfig.color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Order"
        component={OrdersNavigator}
        options={{
          drawerIcon: drawerConfig => (
            <Ionicons name="ios-list" size={23} color={drawerConfig.color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Admin"
        component={AdminNavigator}
        options={{
          drawerIcon: drawerConfig => (
            <Ionicons name="ios-create" size={23} color={drawerConfig.color} />
          ),
        }}
      />
    </Drawer.Navigator>
  </NavigationContainer>
);

export default shopNavigator;
