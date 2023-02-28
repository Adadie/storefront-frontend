import React, { useEffect, useState } from 'react';
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
import _ from 'lodash';

import InputWithLabel from '../../common/textInput';
import ButtonComponent from '../../common/button';
import { getCategories } from '../../../helpers/categories';
import { createProduct } from '../../../helpers/products';

type productObject = {
  productName: string;
  productPrice: string;
  productCategory: string;
  productDescription: string;
  productMfg: string;
  productImage: string;
};

const NewProductComponent = () => {
  const [product, setProduct] = useState<productObject | null>();
  const [category, setCategory] = useState();
  const [open, setOpen] = useState<boolean>(false);
  const [date, setDate] = useState(new Date());
  const [openDatePicker, setOpenDatePicker] = useState<boolean>(false);
  const [image, setImage] = useState(null);
  const [categoryOptions, setCategoryOptions] = useState<object>();

  const navigation = useNavigation();

  const createOptions = async (data: object) => {
    try {
      let options = _.map(data, (item) => ({
        id: item.id,
        value: item.name,
        label: item.name,
      }));
      return options;
    } catch (error) {}
  };

  const getData = async () => {
    try {
      let categoriesRes = await getCategories();
      if (!categoriesRes.has_error && categoriesRes.data.lenght > 0) {
        let categories = await createOptions(categoriesRes.data);
        setCategoryOptions(categories);
      }
      if (!categoriesRes.has_error) {
        setCategoryOptions([]);
      }
    } catch (error) {
      console.log('Error caught NewProductComponent - getData()', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

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
    } catch (error) {
      console.log('Error caught ProductForm - pickImage()', error);
    }
  };

  const handleChange: (a, b: string) => void = (value, name) => {
    try {
      console.log('Changeeeeeeeeeeee value', value);
      console.log('Changeeeeeeeeeeee name', name);
      setProduct({ ...product, [name]: value });
    } catch (error) {
      console.log('Error caught ProductForm - handleChange()', error);
    }
  };
  const handleDateChange: (a, b) => void = (e, date) => {
    try {
      console.log('Date change dateeeeeee', date);
      setOpenDatePicker(false);
      setDate(date);
    } catch (error) {
      console.log('Error caught ProductForm - handleChange()', error);
    }
  };
  
  const pressHandler: () => void = async () => {
    try {
      console.log('Submitting product');

      const { productName, productDescription, productPrice } = product;
      let payload = {
        name: productName,
        description: productDescription,
        price: productPrice,
        image: '',
        category: 'Clothing',
        mfgDate: date,
      };
      payload.image = image;

      let response = await createProduct(payload);
      console.log('Rsponse after crreate----------', response);

      // navigation.navigate('publishedProducts');
    } catch (error) {
      console.log('Error caught ProductForm - pressHandler()', error);
    }
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
            value={product?.productPrice}
            onChangeText={(e) => handleChange(e, 'productPrice')}
          />
          <InputWithLabel
            label="Short description"
            multiline={true}
            numberOfLines={4}
            value={product?.productDescription}
            onChangeText={(e) => handleChange(e, 'productDescription')}
          />
          {/* <DropDownPicker
            style={styles.select}
            items={categoryOptions}
            open={open}
            // setOpen={handleOpen}
            value={category}
            // setValue={setCategory}
            // onSelectItem={handleSelection}
            listMode="MODAL"
            modalAnimationType="fade"
            theme="LIGHT"
            multiple={false}
          /> */}
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
                onChange={handleDateChange}
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
