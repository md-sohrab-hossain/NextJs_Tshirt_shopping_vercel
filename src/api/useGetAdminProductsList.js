import axios from 'axios';
import { useQuery } from 'react-query';

const fetchProductsData = (Url, pageNumber) => {
  let link = `${Url}/api/admin/products?page=${pageNumber}`;
  return axios.get(link);
};

export const useGetAdminProductsList = (Url, pageNumber = 1) => {
  return useQuery(['productsAdmin', pageNumber], () => fetchProductsData(Url, pageNumber), {
    staleTime: 5000, // stel time used for stop recall api request
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
    //data transformation 👇 it will pass modified data
    select: data => data?.data,
  });
};
