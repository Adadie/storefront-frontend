import React from 'react';
import { StyleSheet, View } from 'react-native';
import LoginComponent from '../components/login';
import NewProductComponent from '../components/products/productForm/newProductForm';

const NewProductScreen = () => {
  return (
    <View style={styles.container}>
      <NewProductComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default NewProductScreen;