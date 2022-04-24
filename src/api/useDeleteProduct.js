import axios from 'axios';
import { useMutation } from 'react-query';

const removeProduct = async productId => {
  return await axios.delete(`/api/productOrder/myOrder/${productId}`);
};

export const useDeleteProduct = () => {
  return useMutation(productId => removeProduct(productId), {
    onSuccess: async data => {
      return data;
    },
    onError: async error => {
      return error;
    },
  });
};
