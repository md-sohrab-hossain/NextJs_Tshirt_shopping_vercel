import React from 'react';
import { getProductDetails } from '../../../redux/actions/productAction';
import ProductDetails from '../../../components/product/ProductDetails';
function ProductDetailsPage({ props }) {
  return <ProductDetails title="Product Details" product={props?.product} />;
}

ProductDetailsPage.getInitialProps = async ({ req, query, store }) => {
  await store.dispatch(getProductDetails(req, query?.id));

  const item = store.getState();
  const product = item?.getProductDetails?.product;

  return {
    props: { product },
  };
};

export default ProductDetailsPage;
