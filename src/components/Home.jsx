import Heading from 'components/atoms/heading';
import InputText from 'components/atoms/input-text';
import Card from 'components/molecules/card';
import Section from 'components/molecules/section';
import Grid from 'components/organisms/grid';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Pagination from 'react-js-pagination';
import Loading from '../components/atoms/Loading';

const Home = ({ productsData }) => {
  const router = useRouter();
  const [allProduct, setAllproducts] = useState(() => productsData);
  const { loading, products, productsCount, resultPerPage } = allProduct;

  const handlePagination = pageNumber => {
    window.location.href = `/?page=${pageNumber}`;
    // let url = window.location.href + `/?page=${pageNumber}`;

    // url = url.replace(/\b\/\?page=([1-9])(\/)?/g, "");

    // router.push(url);
    // router.push({ pathname: "/", query: { page: pageNumber } });
  };

  let { page = 1 } = router.query;
  let count = productsCount;
  page = Number(page);

  const filterItem = e => {
    const productList = products;
    const filterProduct = productList.filter(item =>
      item.name.toLowerCase().includes(e.target.value.trim().toLowerCase())
    );

    if (e.target.value.trim() == '') {
      count = productsCount;
      setAllproducts({
        ...allProduct,
        products: productsData.products,
      });
    } else {
      count = filterProduct.length;
      setAllproducts({
        ...allProduct,
        products: filterProduct.length ? filterProduct : productsData.products,
      });
    }
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <Section modifiers="side-by-side">
        <Heading large>Our Products</Heading>
        <InputText placeholder="Search.." onChange={filterItem} />
      </Section>

      <Grid>
        {!products?.length ? (
          <div>
            <b>No Products. &#128542;</b>
          </div>
        ) : (
          products?.map(product => <Card key={product._id} product={product} />)
        )}
      </Grid>

      {resultPerPage < count && (
        <div className="pagination">
          <Pagination
            activePage={page}
            itemsCountPerPage={resultPerPage}
            totalItemsCount={productsCount}
            onChange={handlePagination}
            nextPageText={'Next'}
            prevPageText={'Prev'}
            firstPageText={'First'}
            lastPageText={'Last'}
            itemClass="page-item"
            linkClass="page-link"
          />
        </div>
      )}
    </div>
  );
};

export default Home;
