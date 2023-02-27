import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/login';
import HomeScreen from '../screens/home';
import NewProductScreen from '../screens/newProduct';
import PublishedProductsScreen from '../screens/clientProducts';
import SingleProductScreen from '../screens/singleProduct';

const Stacks = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Login ">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerTitle: '' }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerTitle: '', headerBackButtonMenuEnabled: false }}
      />
      <Stack.Screen
        name="newProduct"
        component={NewProductScreen}
        options={{
          headerTitle: 'Add New Product',
          headerBackButtonMenuEnabled: false,
        }}
      />
      <Stack.Screen
        name="publishedProducts"
        component={PublishedProductsScreen}
        options={{
          headerTitle: 'Products',
          headerBackButtonMenuEnabled: false,
        }}
      />
      <Stack.Screen
        name="singleProduct"
        component={SingleProductScreen}
        options={{
          headerTitle: '',
        }}
      />
    </Stack.Navigator>
  );
};

export default Stacks;
