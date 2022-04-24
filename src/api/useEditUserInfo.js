import axios from 'axios';
import { useMutation } from 'react-query';

const updateInformation = async userData => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return await axios.put(`/api/admin/users/${userData[0]}`, userData[1], config);
};

export const useEditUserInfo = () => {
  return useMutation(async ({ data: userData }) => await updateInformation(userData), {
    onSuccess: async data => {
      return data;
    },
    onError: async error => {
      return error;
    },
  });
};
