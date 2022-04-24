import axios from 'axios';
import { useQuery } from 'react-query';

const fetchUserDetails = async id => {
  return await axios.get(`/api/admin/users/${id}`);
};

export const useGetUserDetailsById = userId => {
  return useQuery(['userDetailsById', userId], () => fetchUserDetails(userId), {
    staleTime: 5000, // stel time used for stop recall api request
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
    //data transformation 👇 it will pass modified data
    select: data => data.data,
  });
};
