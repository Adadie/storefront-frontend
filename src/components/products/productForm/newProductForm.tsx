import React, { useState } from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import DatePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';

import InputWithLabel from '../../common/textInput';
import ButtonComponent from '../../common/button';

type productObject = {
  productName: string;
  productPrice: number;
  productCategory: string;
  productDescription: string;
  productMfg: string;
  productImage: string;
};

const NewProductComponent = () => {
  const [product, setProduct] = useState<productObject | null>();
  const [open, setOpen] = useState<boolean>(false);
  const [date, setDate] = useState(new Date());
  const [openDatePicker, setOpenDatePicker] = useState<boolean>(false);
  const [image, setImage] = useState(null);

  const navigation = useNavigation();

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      console.log(result);

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {}
  };

  const handleChange: (a, b: string) => void = (e, name) => {
    try {
      const { value } = e.target;
      setProduct({ ...product, [name]: value });
    } catch (error) {}
  };

  const pressHandler: () => void = () => {
    try {
      navigation.navigate('Home');
    } catch (error) {}
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputsView}>
        <InputWithLabel
          label="Product Name"
          value={product?.productName}
          onChangeText={(e) => handleChange(e, 'productName')}
        />
        <InputWithLabel
          label="Product Price"
          keyboardType="numeric"
          value={product?.productDescription}
          onChangeText={(e) => handleChange(e, 'productPrice')}
        />
        <InputWithLabel
          label="Short description"
          multiline={true}
          numberOfLines={4}
          value={product?.productDescription}
          onChangeText={(e) => handleChange(e, 'productPrice')}
        />
        <DropDownPicker
          items={[
            { value: 1, label: 'Shirt' },
            { value: 2, label: 'Dress' },
            { value: 3, label: 'Trouser' },
          ]}
          open={open}
          setOpen={setOpen}
          value={product?.productPrice}
          setValue={setProduct}
          listMode="MODAL"
          modalAnimationType="fade"
          theme="LIGHT"
          multiple={false}
        />
        <>
          <Button title="DatePicker" onPress={() => setOpenDatePicker(true)} />
          {openDatePicker && (
            <DatePicker
              style={{ width: 200 }}
              value={date}
              mode="date"
              dateFormat="shortdate"
              onChange={() => setOpenDatePicker(false)}
            />
          )}
        </>
        <>
          <Button title="Pick an image from camera roll" onPress={pickImage} />
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200 }}
            />
          )}
        </>
      </View>
      <ButtonComponent title="Add Product" onPress={pressHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    // marginBottom: 20,
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

export default NewProductComponent;
