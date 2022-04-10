import React from 'react';
import Pagination from 'react-js-pagination';
import { mapModifiers } from '../../../libs/component';

const Paginations = ({ activePage, resultPerPage, itemsCount, onChange }) => {
  const componentClassName = mapModifiers('a-pagination');
  const className = `${componentClassName}`.trim();

  return (
    <div className={className}>
      <Pagination
        activePage={activePage}
        itemsCountPerPage={resultPerPage}
        totalItemsCount={itemsCount}
        onChange={onChange}
        nextPageText={'Next'}
        prevPageText={'Prev'}
        firstPageText={'First'}
        lastPageText={'Last'}
        itemClass="page-item"
        linkClass="page-link"
      />
    </div>
  );
};

export default Paginations;
