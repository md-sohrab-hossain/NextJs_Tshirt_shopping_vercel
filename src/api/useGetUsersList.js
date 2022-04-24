import axios from 'axios';
import { useQuery } from 'react-query';

const fetchUsersList = async () => {
  return await axios.get('/api/admin/users');
};

export const useGetUsersList = () => {
  return useQuery(['usersList'], fetchUsersList, {
    staleTime: 5000, // stel time used for stop recall api request
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
    //data transformation 👇 it will pass modified data
    select: data => data.data,
  });
};
