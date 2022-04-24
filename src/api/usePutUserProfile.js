import axios from 'axios';
import { useMutation } from 'react-query';

const updateInformation = async userData => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return await axios.put('/api/user/updateUserInfo', userData, config);
};

export const usePutUserProfile = () => {
  return useMutation(updateInformation, {
    onSuccess: async data => {
      return data;
    },
    onError: async error => {
      return error;
    },
  });
};
