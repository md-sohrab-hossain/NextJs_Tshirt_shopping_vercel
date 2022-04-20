import { mapModifiers } from 'libs/component';
import React from 'react';

const Table = ({ children }) => {
  const componentClassName = mapModifiers('a-table');
  const className = `${componentClassName}`.trim();

  return (
    <div className={className}>
      <table className="a-table__container">
        <thead className="a-table__container--head">
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Ratings</th>
            <th>Created Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="a-table__container--body">{children}</tbody>
      </table>
    </div>
  );
};

export default Table;
