import ButtonCircle from 'components/atoms/button-circle';
import Heading from 'components/atoms/heading';
import InputText from 'components/atoms/input-text';
import Pagination from 'components/atoms/pagination';
import Card from 'components/molecules/card';
import Section from 'components/molecules/section';
import Grid from 'components/organisms/grid';
import React from 'react';

const DashBoard = ({ products, totalProducts, activePage, searchItems, onChange }) => {
  const pages = parseInt(totalProducts / 8) + (totalProducts % 8 > 0 ? 1 : 0);

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

      <div className="t-dashboard__design-btn">
        <ButtonCircle />
      </div>

      <Pagination length={pages} currentIndex={activePage} onChange={onChange} />
    </div>
  );
};

export default DashBoard;
