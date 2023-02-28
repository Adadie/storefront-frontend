import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
  Share,
  Button,
} from 'react-native';
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

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Get this product at Creative app ${
          product && product.image
            ? product.image
            : 'https://images.unsplash.com/photo-1552346154-21d32810aba3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
        }`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          Alert.alert('Thank you for sharing');
        } else {
        }
      } else if (result.action === Share.dismissedAction) {
        Alert.alert('Sharing cancelled');
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

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
      <View style={{ marginTop: 50 }}>
        <Button onPress={onShare} title="Share" />
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
