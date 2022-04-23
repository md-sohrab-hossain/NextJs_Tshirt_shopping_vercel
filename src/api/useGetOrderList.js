import axios from 'axios';
import { useQuery } from 'react-query';

const fetOrderList = Url => {
  let link = `${Url}/api/productOrder/myOrder`;
  return axios.get(link);
};

export const useGetOrderList = Url => {
  return useQuery(['productOrders'], () => fetOrderList(Url), {
    staleTime: 5000, // stel time used for stop recall api request
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
    //data transformation 👇 it will pass modified data
    select: data => data?.data,
  });
};
