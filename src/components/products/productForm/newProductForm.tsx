import React, { useEffect, useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import DatePicker from '@react-native-community/datetimepicker';
import _ from 'lodash';

import InputWithLabel from '../../common/textInput';
import ButtonComponent from '../../common/button';
import { getCategories } from '../../../helpers/categories';
import { createProduct } from '../../../helpers/products';
import ImageUploader from '../../common/imageUploader';

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
  const [category, setCategory] = useState<string>();
  const [open, setOpen] = useState<boolean>(false);
  const [date, setDate] = useState(new Date());
  const [openDatePicker, setOpenDatePicker] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [categoryOptions, setCategoryOptions] = useState([]);

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
      if (!categoriesRes.has_error && categoriesRes.data.length > 0) {
        let categories = await createOptions(categoriesRes.data);
        setCategoryOptions(categories);
      }
      if (categoriesRes.has_error) {
        setCategoryOptions([]);
      }
    } catch (error) {
      console.log('Error caught NewProductComponent - getData()', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleChange: (a, bgetCategories: string) => void = (value, name) => {
    try {
      setProduct({ ...product, [name]: value });
    } catch (error) {
      console.log('Error caught ProductForm - handleChange()', error);
    }
  };
  const handleDateChange: (a, b) => void = (e, date) => {
    try {
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
        image: imageUrl,
        category: category,
        mfgDate: date,
      };
      let response = await createProduct(payload);
      Alert.alert('Hooray!', 'Product Created successfully');
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
          <DropDownPicker
            style={styles.select}
            items={categoryOptions}
            open={open}
            setOpen={setOpen}
            value={category}
            setValue={setCategory}
            listMode="MODAL"
            modalAnimationType="fade"
            theme="LIGHT"
            multiple={false}
            placeholder='Select a category'
          />
          <>
            <Text style={styles.label}>Manufacturing Date</Text>
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
          <ImageUploader setImageUrl={setImageUrl} />
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
    marginTop: 18,
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
