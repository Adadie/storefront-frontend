import React from 'react';
import { StyleSheet, View } from 'react-native';
import PublishedProducts from '../components/products/clients/publishedProductsScreen';

const PublishedProductsScreen = () => {
  return (
    <View style={styles.container}>
      <PublishedProducts />
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

export default PublishedProductsScreen;