import axios from 'axios';
import { API_URL } from '../../config';
import { getRemote } from './getRemote';

// export const getCategories = async () => {
//   try {
//     let response = await getRemote('getCategories', 'GET', `${API_URL}/categories`);
//     console.log("ressssssssssssssss------" , response)
//     return response
//   } catch (error) {
//     console.log('Error caught in getCategories()', error);
//   }
// };

export const getCategories = async () => {
  try {
    let res = { has_error: false, data: null, error: [] };
    let categoriesRes = await axios.get(`${API_URL}/categories`);
    if (categoriesRes.data && categoriesRes.data.categories) {
      res.data = categoriesRes.data.categories;
    }
    console.log('ressssssssssssssssponse------', res.data);
    return res;
  } catch (error) {
    console.log('Error caught in getCategories res()', error);
  }
};
