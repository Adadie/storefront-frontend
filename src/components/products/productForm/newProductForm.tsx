import React, { useState } from 'react';
import {
  Button,
  Image,
  ScrollView,
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
      <ScrollView>
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
            style={styles.select}
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
            <TouchableOpacity
              onPress={() => setOpenDatePicker(true)}
              style={styles.select}
            >
              <Text style={!date && styles.label}>
                {date ? date.toDateString() : 'Pick Manufacturing Date'}
              </Text>
            </TouchableOpacity>
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
            <Text style={styles.label}>Add Image</Text>
            <TouchableOpacity onPress={pickImage} style={styles.imageSelect}>
              <Text style={styles.plus}>+</Text>
            </TouchableOpacity>
            {image && <Image source={{ uri: image }} style={styles.image} />}
          </>
        </View>
      </ScrollView>
      <ButtonComponent title="Add Product" onPress={pressHandler} />
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

export default NewProductComponent;
