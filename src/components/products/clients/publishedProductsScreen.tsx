import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PublishedProducts = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text>Client Products</Text>
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
  },
  inputsView: {
    marginBottom: 10,
  },
  select: {
    justifyContent: 'center',
    height: 40,
    fontSize: 16,
    paddingLeft: 16,
    borderWidth: 1,
    width: 260,
    marginVertical: 16,
    borderRadius: 8,
  },
  label: {
    fontSize: 16,
    alignSelf: 'flex-start',
    color: 'gray',
  },
  imageSelect: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    height: 80,
    width: 120,
    borderWidth: 1,
    marginVertical: 16,
    borderRadius: 8,
    paddingBottom: 15,
    paddingTop: 0,
  },
  plus: {
    fontSize: 64,
    fontWeight: '200',
  },
  image: {
    marginBottom: 30,
    width: 200,
    height: 200,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
});

export default PublishedProducts;
