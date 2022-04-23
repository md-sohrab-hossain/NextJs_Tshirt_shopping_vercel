import axios from 'axios';
import { useQuery } from 'react-query';

const fetchProductDetails = (absoluteUrl, productId) => {
  let link = `${absoluteUrl}/api/user/products/${productId}`;
  return axios.get(link);
};

export const useGetProductDetails = (absoluteUrl, productId) => {
  return useQuery(['productDetails', productId], () => fetchProductDetails(absoluteUrl, productId), {
    staleTime: 5000, // stel time used for stop recall api request
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
    //data transformation 👇 it will pass modified data
    select: data => {
      return {
        price: data.data.product.price,
        ratings: data.data.product.ratings,
        numOfReviews: data.data.product.numOfReviews,
        name: data.data.product.name,
        error: data.data.product.error,
        description: data.data.product.description,
        images: data.data.product.images,
        _id: data.data.product._id,
      };
    },
  });
};
