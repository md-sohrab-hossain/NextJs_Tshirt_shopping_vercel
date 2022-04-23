import axios from 'axios';
import { useQuery } from 'react-query';

const fetchProductsData = (Url, pageNumber) => {
  let link = `${Url}/api/user/products?page=${pageNumber}`;
  return axios.get(link);
};

export const useGetAllProducts = (Url, pageNumber = 1) => {
  return useQuery(['products', pageNumber], () => fetchProductsData(Url, pageNumber), {
    staleTime: 5000, // stel time used for stop recall api request
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
    //data transformation 👇 it will pass modified data
    select: data => data?.data,
  });
};
