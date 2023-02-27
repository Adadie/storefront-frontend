import React from 'react';
import { StyleSheet, View } from 'react-native';
import ProductDetails from '../components/products/singleProduct';

const SingleProductScreen = () => {
  return (
    <View style={styles.container}>
      <ProductDetails
        image={
          'https://images.unsplash.com/photo-1552346154-21d32810aba3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
        }
        name={'Converse'}
        category="Shoes"
        description="Product description goes here."
        price={'2000'}
        mfg={'27th-Feb-2023'}
        rating={3.5}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SingleProductScreen;
