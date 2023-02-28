import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import InputWithLabel from '../common/textInput';
import ButtonComponent from '../common/button';

const LoginComponent = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const navigation = useNavigation();

  const pressHandler: () => void = () => {
    try {
      navigation.navigate('Home');
    } catch (error) {}
  };

  const ClientLogin: () => void = () => {
    try {
      navigation.navigate('publishedProducts');
    } catch (error) {}
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../../../assets/logo.png')}
      />
      <Text style={styles.title}>Login</Text>
      <View style={styles.inputsView}>
        <InputWithLabel
          label="Email/Username"
          value={email}
          onChangeText={setEmail}
        />
        <InputWithLabel
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
      </View>
      <TouchableOpacity style={styles.forgotPasswordWrap}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>
      <ButtonComponent title="Login as Seller" onPress={pressHandler} />
      <Text>or</Text>
      
      <ButtonComponent title="Login as Client" onPress={ClientLogin} />
      <View style={styles.signupView}>
        <Text>
          Don't have an account?
          {/* <TouchableOpacity > */}
          <Text style={styles.forgotPassword}> Signup</Text>
          {/* </TouchableOpacity> */}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputsView: {
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  forgotPasswordWrap: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPassword: {
    textDecorationLine: 'underline',
  },
  image: {
    marginBottom: 30,
  },
  signupView: {
    marginVertical: 20,
  },
});

export default LoginComponent;
