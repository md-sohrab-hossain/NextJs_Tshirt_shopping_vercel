import axios from 'axios';
import { useMutation } from 'react-query';

const createNew = async productData => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return await axios.post('/api/admin/products', productData, config);
};

export const useCreateNewProduct = () => {
  return useMutation(createNew, {
    onSuccess: async data => {
      return data;
    },
    onError: async error => {
      return error;
    },
  });
};
