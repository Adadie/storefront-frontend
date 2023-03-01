import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import _ from 'lodash';

import ProductCard from '../productCard';
import { getProducts } from '../../../helpers/products';

const PublishedProducts = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState<object[]>();

  const getData = async () => {
    try {
      let productsRes = await getProducts();
      console.log('Products----->', productsRes.data);
      if (!productsRes.has_error && productsRes.data.length > 0) {
        setProducts(_.orderBy(productsRes.data , 'createdAt', 'desc').slice(0, 10));
      }
      if (productsRes.has_error) {
        setProducts([]);
      }
    } catch (error) {
      console.log('Error caught NewProductComponent - getData()', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleProductSelect = async (product: object) => {
    try {
      await AsyncStorage.setItem('selectedProduct', JSON.stringify(product));
      navigation.navigate('singleProduct');
    } catch (error) {}
  };
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View>
          <Image
            source={require('../../../../assets/banner.png')}
            style={styles.image}
          />
        </View>
        {products && (
          <View>
            {products.map((item, index) => (
              <ProductCard
                key={index}
                image={
                  item.image
                    ? item.image
                    : 'https://images.unsplash.com/photo-1552346154-21d32810aba3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
                }
                name={item.name}
                description={item.description}
                price={`$${item.price}`}
                onPress={() => handleProductSelect(item)}
              />
            ))}
          </View>
        )}
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
