import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const YourComponent = ({setImageUrl}) => {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      uploadToCloudinary(result.assets[0].uri);
      console.log('result url==>', result.assets[0].uri);
    }
  };

  const uploadToCloudinary = async (uri) => {
    const apiUrl = 'https://api.cloudinary.com/v1_1/dusg5lo7w/upload';
    const formData = new FormData();
    formData.append('file', { uri, type: 'image/jpg', name: 'upload.jpg' });
    formData.append('upload_preset', 'thzrtakt');

    try {
      const response = await axios.request({
        method: 'POST',
        url: apiUrl,
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('uploadToCloudinary response=>', response.data.url);
      setImageUrl(response.data.url)
      return;
    } catch (error) {
      console.log('Error caught in uploadToCloudinary()', error);
    }
  };

  return (
    <View>
      <Text style={styles.label}>Add Image</Text>
      <TouchableOpacity onPress={pickImage} style={styles.imageSelect}>
        <Text style={styles.plus}>+</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={styles.image} />}
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

export default YourComponent;
