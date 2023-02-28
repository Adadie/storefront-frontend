import axios from 'axios';
import { API_URL } from '../../config';

export const createProduct = async (payload: object) => {
  try {
    let res = { has_error: false, data: null, error: [] };
    let productsRes = await axios.request({
      method: 'POST',
      url: `${API_URL}/products`,
      data: payload,
    });
    console.log('ressssssssssssssssponse------', productsRes);
    return res;
  } catch (error) {
    console.log('Error caught in createProduct()', error);
  }
};

export const getProducts = async () => {
  try {
    let res = { has_error: false, data: null, error: [] };
    let productsRes = await axios.request({
      method: 'GET',
      url: `${API_URL}/products`,
    });
    console.log('ressssssssssssssssponse------', productsRes);
    if (productsRes.status == 200) {
      if (productsRes.data && productsRes.data.products) {
        res.data = productsRes.data.products;
      }
      if (!productsRes.data) {
        res.data = [];
      }
    }
    return res;
  } catch (error) {
    console.log('Error caught in createProduct()', error);
  }
};
