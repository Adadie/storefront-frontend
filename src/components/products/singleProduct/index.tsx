import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

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
  category
}: ProductDetailsProps) => {
  return (
    <View style={styles.container}>
      <View>
      <Image source={{ uri: image }} style={styles.image} />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.category}>{category}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.price}>${price}</Text>
        <Text style={styles.rating}>Manufacturing Date: {mfg}</Text>
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
