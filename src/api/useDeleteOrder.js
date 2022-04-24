import axios from 'axios';
import { useMutation } from 'react-query';

const removeOrder = async orderId => {
  return await axios.delete(`/api/productOrder/myOrder/${orderId}`);
};

export const useDeleteOrder = () => {
  return useMutation(orderId => removeOrder(orderId), {
    onSuccess: async data => {
      return data;
    },
    onError: async error => {
      return error;
    },
  });
};
