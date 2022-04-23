import axios from 'axios';
import { useMutation } from 'react-query';

const addNewProduct = async productData => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return await axios.post('/api/productOrder', productData, config);
};

export const usePostNewOrder = () => {
  return useMutation(addNewProduct, {
    onSuccess: async data => {
      return data;
    },
    onError: async error => {
      return error;
    },
  });
};
