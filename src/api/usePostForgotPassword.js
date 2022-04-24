import axios from 'axios';
import { useMutation } from 'react-query';

const forgotPassword = async email => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return await axios.post('/api/user/password/forgot', email, config);
};

export const usePostForgotPassword = () => {
  return useMutation(forgotPassword, {
    onSuccess: async data => {
      return data;
    },
    onError: async error => {
      return error;
    },
  });
};
