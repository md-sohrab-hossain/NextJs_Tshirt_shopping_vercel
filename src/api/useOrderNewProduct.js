import axios from 'axios';
import { useMutation } from 'react-query';

const orderNewProduct = async productData => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return await axios.post('/api/productOrder', productData, config);
};

export const useOrderNewProduct = () => {
  return useMutation(orderNewProduct, {
    onSuccess: async data => {
      return data;
    },
    onError: async error => {
      return error;
    },
  });
};
