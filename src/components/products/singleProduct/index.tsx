import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

interface ProductDetailsProps {
  image: string;
  name: string;
  description: string;
  category: string;
  price: string;
  mfg: string;
  rating: number;
}

const ProductDetails = ({
  image,
  name,
  description,
  price,
  mfg,
  rating,
  category,
}: ProductDetailsProps) => {
  const [product, setProduct] = useState();

  const getData = async () => {
    try {
      let product = await AsyncStorage.getItem('selectedProduct');
      if (product) {
        let productObj = JSON.parse(product);
        setProduct(productObj);
      }
    } catch (error) {
      console.log('Error caught ProductDetails - getData()', error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Product not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View>
        <Image
          source={{ uri: product.image ? product.image : image }}
          style={styles.image}
        />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.category}>{product.category}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <Text style={styles.price}>${product.price}</Text>
        <Text style={styles.rating}>
          Manufacturing Date: {moment(product.mfgDate).format('MMMM Do YYYY')}
        </Text>
        <Text style={styles.rating}>Rating: {rating}/5</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  detailsContainer: {
    padding: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  category: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00aaff',
    marginBottom: 10,
  },
  rating: {
    fontSize: 16,
    color: '#888',
  },
});

export default ProductDetails;
