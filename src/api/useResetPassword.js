import axios from 'axios';
import { useMutation } from 'react-query';

const resetPassword = async resetData => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return await axios.put(`/api/user/password/reset/${resetData[0]}`, resetData[1], config);
};

export const useResetPassword = () => {
  return useMutation(async ({ data: resetData }) => await resetPassword(resetData), {
    onSuccess: async data => {
      return data;
    },
    onError: async error => {
      return error;
    },
  });
};
