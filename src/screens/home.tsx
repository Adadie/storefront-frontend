import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const pressHandler = () => {
    navigation.navigate('newProduct');
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pressHandler} style={styles.button}>
        <Text style={styles.text}>Add New Product</Text>
      </TouchableOpacity>
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
  button: {
    borderRadius: 8,
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: '#1C756C',
    width: 180,
    alignItems: 'center',
    elevation: 10,
  },
  text:{
    color:'#ffffff',
    fontWeight:'bold'
  }
});

export default HomeScreen;
