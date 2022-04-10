import DashBoard from 'components/templates/dashboard';
import React from 'react';
import { getAllProducts } from 'redux/actions/productAction';

const App = ({ props }) => {
  return <DashBoard productsData={props.products} />;
};

App.getInitialProps = async ({ req, query, store }) => {
  await store.dispatch(getAllProducts(req, query.page));

  const product = store.getState();
  const products = product.getAllProducts;

  return {
    props: { products },
  };
};

export default App;
