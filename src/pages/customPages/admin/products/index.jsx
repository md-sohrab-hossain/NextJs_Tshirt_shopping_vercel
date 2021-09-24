import React from "react";

import { getAdminProducts } from "../../../../redux/actions/productAction";
import AllProducts from "../../../../components/admin/AllProducts";

const AdminProductsPage = ({ props }) => {
  return <AllProducts productsData={props.products} />;
};

AdminProductsPage.getInitialProps = async ({ req, query, store }) => {
  await store.dispatch(getAdminProducts(req, query.page));

  const product = store.getState();
  const products = product.getAllProductsAdmin;

  return {
    props: { products },
  };
};

export default AdminProductsPage;
