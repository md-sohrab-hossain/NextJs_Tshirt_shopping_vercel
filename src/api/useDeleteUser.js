import axios from 'axios';
import { useMutation } from 'react-query';

const removeUser = async userId => {
  return await axios.delete(`/api/admin/users/${userId}`);
};

export const useDeleteUser = () => {
  return useMutation(userId => removeUser(userId), {
    onSuccess: async data => {
      return data;
    },
    onError: async error => {
      return error;
    },
  });
};
