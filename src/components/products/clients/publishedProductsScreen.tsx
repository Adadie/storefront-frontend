import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ProductCard from '../productCard';

const PublishedProducts = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Products</Text> */}
      <ScrollView style={styles.scrollView}>
        <View>
          <Image
            source={require('../../../../assets/banner.png')}
            style={styles.image}
          />
        </View>
        <View>
          <ProductCard
            image={
              'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=821&q=80'
            }
            name="Converse"
            description="Product description goes here."
            price="$24.99"
            onPress={() => navigation.navigate('singleProduct')}
          />
          {new Array(10).fill(undefined).map((item, index) => (
            <ProductCard
              key={index}
              image={
                'https://images.unsplash.com/photo-1552346154-21d32810aba3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
              }
              name="Nike"
              description="Product description goes here."
              price="$19.99"
              onPress={() => navigation.navigate('singleProduct')}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 20,
    marginHorizontal: 5,
  },
  title: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 24,
    marginVertical: 12,
  },
  scrollView: {
    flex: 1,
    marginHorizontal: 5,
  },
  inputsView: {
    marginBottom: 10,
  },
  image: {
    marginBottom: 30,
    marginRight: 30,
    height: 200,
    resizeMode: 'cover',
  },
});

export default PublishedProducts;
