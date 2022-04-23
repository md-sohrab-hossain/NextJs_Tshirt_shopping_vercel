import axios from 'axios';
import { useQuery } from 'react-query';

const fetchUserDetails = async () => {
  return await axios.get('/api/user/userInfo');
};

export const useGetUserDetails = () => {
  return useQuery(['userDetails'], fetchUserDetails, {
    staleTime: 5000, // stel time used for stop recall api request
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
    //data transformation 👇 it will pass modified data
    select: data => data.data,
  });
};
