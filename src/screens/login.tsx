import React from 'react';
import { StyleSheet, View } from 'react-native';
import LoginComponent from '../components/login';

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <LoginComponent />
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

export default LoginScreen;