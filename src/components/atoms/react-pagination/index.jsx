import { mapModifiers } from 'libs/component';
import React from 'react';
import Pagination from 'react-js-pagination';
//Note: need to install react-bootstrap to view actual ui

const ReactPaginations = ({ activePage, resultPerPage, itemsCount, onChange }) => {
  const componentClassName = mapModifiers('a-react-pagination');
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

export default ReactPaginations;
