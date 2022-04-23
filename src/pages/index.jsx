import { useGetAllProducts } from 'api/useGetAllProducts';
import Loading from 'components/atoms/loading';
import DashBoard from 'components/templates/dashboard';
import { useGetAbsoluteUrl } from 'libs/utils';
import React, { useEffect, useState } from 'react';

const App = () => {
  const [pageNumber, setPageNumber] = useState(() => 1);
  const [allProducts, setAllproducts] = useState(() => []);

  const absoluteUrl = useGetAbsoluteUrl();
  const { data, isLoading } = useGetAllProducts(absoluteUrl, pageNumber);

  useEffect(() => {
    !isLoading && setAllproducts(data.products);
  }, [data, isLoading]);

  const searchItems = e => {
    if (e.target.value.trim() == '') {
      setAllproducts(data.products);
    } else {
      const productsList = data.products;
      const filterProduct = productsList.filter(item =>
        item.name.toLowerCase().includes(e.target.value.trim().toLowerCase())
      );
      setAllproducts(filterProduct.length ? filterProduct : data.products);
    }
  };

  const handlePagination = pageNumber => setPageNumber(pageNumber);
  if (isLoading) return <Loading square />;

  return (
    <>
      <DashBoard
        products={allProducts}
        onChange={handlePagination}
        totalProducts={data.productsCount}
        activePage={pageNumber}
        searchItems={searchItems}
      />
    </>
  );
};

export default App;
