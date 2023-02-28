import axios from 'axios';
import { API_URL } from '../../config';

export const login = async (payload: object) => {
  let res = { has_error: false, data: null, error: [] };
  try {
    let productsRes = await axios.request({
      method: 'POST',
      url: `${API_URL}/auth/login`,
      data: payload,
    });
    console.log('after login------', productsRes.status);
    if (productsRes.status == 200) {
      res.data = productsRes.data;
    } else {
      res.has_error = true;
    }
    return res;
  } catch (error) {
    console.log('Error caught in login()', error);
    res.has_error = true;
    return res;
  }
};
