import axios from 'axios';
import { useMutation } from 'react-query';

const registerUser = async userData => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return await axios.post('/api/user/register', userData, config);
};

export const usePostRegisterUser = () => {
  return useMutation(registerUser, {
    onSuccess: async data => {
      return data;
    },
    onError: async error => {
      return error;
    },
  });
};
