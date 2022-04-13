import Heading from 'components/atoms/heading';
import InputText from 'components/atoms/input-text';
import Loading from 'components/atoms/Loading';
import Pagination from 'components/atoms/pagination';
import Card from 'components/molecules/card';
import Section from 'components/molecules/section';
import Grid from 'components/organisms/grid';
import React from 'react';

const DashBoard = ({
  isLoading,
  products,
  productsCount,
  totalProducts,
  resultPerPage,
  activePage,
  onChange,
  searchItems,
}) => {
  if (isLoading) return <Loading />;

  return (
    <div className="t-dashboard">
      <Section modifiers="side-by-side">
        <Heading large>Our Products</Heading>
        <InputText placeholder="Search.." onChange={searchItems} />
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

      {resultPerPage < productsCount && (
        <Pagination
          activePage={activePage}
          resultPerPage={resultPerPage}
          itemsCount={totalProducts}
          onChange={onChange}
        />
      )}
    </div>
  );
};

export default DashBoard;
