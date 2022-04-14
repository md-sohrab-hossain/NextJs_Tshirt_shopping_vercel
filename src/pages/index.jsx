import DashBoard from 'components/templates/dashboard';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { getAllProducts } from 'redux/actions/productAction';

const App = ({ props }) => {
  const router = useRouter();
  const [allProduct, setAllproducts] = useState(() => props.products);
  const { loading, products, productsCount } = allProduct;

  let { page = 1 } = router.query;
  page = Number(page);

  const handlePagination = pageNumber => {
    window.location.href = `/?page=${pageNumber}`;
  };

  const searchItems = e => {
    if (e.target.value.trim() == '') {
      setAllproducts({
        ...allProduct,
        products: props.products.products,
      });
    } else {
      const totalProducts = products;
      const filterProduct = totalProducts.filter(item =>
        item.name.toLowerCase().includes(e.target.value.trim().toLowerCase())
      );

      setAllproducts({
        ...allProduct,
        products: filterProduct.length ? filterProduct : props.products.products,
      });
    }
  };

  return (
    <DashBoard
      products={products}
      onChange={handlePagination}
      totalProducts={productsCount}
      activePage={page}
      isLoading={loading}
      searchItems={searchItems}
    />
  );
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
