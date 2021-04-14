import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {
  CartScreen,
  OrdersScreen,
  ProductDetailScreen,
  ProductOverViewScreen,
} from '../screens/shop';
import {colors} from '../constants';
import {Platform} from 'react-native';

const Stack = createStackNavigator();

const ShopStack = () => (
  <Stack.Navigator
    initialRouteName="ProductOverview"
    screenOptions={{
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? colors.primary : 'white',
      },
      headerTintColor: Platform.OS === 'android' ? 'white' : colors.primary,
    }}>
    <Stack.Screen name="ProductOverview" component={ProductOverViewScreen} />
    <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
    <Stack.Screen name="Orders" component={OrdersScreen} />
    <Stack.Screen name="Cart" component={CartScreen} />
  </Stack.Navigator>
);

const shopNavigator = () => (
  <NavigationContainer>
    <ShopStack />
  </NavigationContainer>
);

export default shopNavigator;
