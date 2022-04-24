import axios from 'axios';
import { useMutation } from 'react-query';

const updateProduct = async productInfo => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return await axios.put(`/api/user/products/${productInfo[0]}`, productInfo[1], config);
};

export const usePutProductInfo = () => {
  return useMutation(async ({ data: productInfo }) => await updateProduct(productInfo), {
    onSuccess: async data => {
      return data;
    },
    onError: async error => {
      return error;
    },
  });
};
