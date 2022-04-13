import DashBoard from 'components/templates/dashboard';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { getAllProducts } from 'redux/actions/productAction';

const App = ({ props }) => {
  const router = useRouter();
  const [allProduct, setAllproducts] = useState(() => props.products);
  const { loading, products, productsCount, resultPerPage } = allProduct;

  let { page = 1 } = router.query;
  let count = productsCount;
  page = Number(page);

  console.log({ allProduct });
  const handlePagination = pageNumber => {
    window.location.href = `/?page=${pageNumber}`;
    // let url = window.location.href + `/?page=${pageNumber}`;

    // url = url.replace(/\b\/\?page=([1-9])(\/)?/g, "");

    // router.push(url);
    // router.push({ pathname: "/", query: { page: pageNumber } });
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

      count = filterProduct.length;
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
      resultPerPage={resultPerPage}
      totalProducts={productsCount}
      activePage={page}
      isLoading={loading}
      productsCount={count}
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
