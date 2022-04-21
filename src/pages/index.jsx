import Loading from 'components/atoms/loading';
import DashBoard from 'components/templates/dashboard';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getAllProducts } from 'redux/actions/productAction';

const App = ({ props }) => {
  const router = useRouter();
  const [isRoutesChange, setIsRoutesChange] = useState(() => false);
  const [allProduct, setAllproducts] = useState(() => props.products);
  const { loading, products, productsCount } = allProduct;

  let { page = 1 } = router.query;
  page = Number(page);

  const handlePagination = pageNumber => {
    setIsRoutesChange(true);
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

  useEffect(() => {
    const handleRouteChange = () => setIsRoutesChange(false);

    router.events.on('routeChangeStart', handleRouteChange);
    router.events.on('routeChangeError', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
      router.events.off('routeChangeError', handleRouteChange);
    };
  }, [router.events]);

  if (loading) return <Loading square />;

  return (
    <>
      <DashBoard
        products={products}
        onChange={handlePagination}
        totalProducts={productsCount}
        activePage={page}
        searchItems={searchItems}
      />
      {isRoutesChange && <Loading overlay />}
    </>
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
