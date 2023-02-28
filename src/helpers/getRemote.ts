import axios from 'axios';
export const getRemote = async (
  functionName: string,
  method: string,
  url: string,
  data?: object
) => {
  try {
    let response = await axios.request({
      method: method,
      url: url,
      data: data ? data : null,
    });

    return response;
  } catch (error) {
    console.log(`Error caught in ${functionName}`, error);
  }
};
