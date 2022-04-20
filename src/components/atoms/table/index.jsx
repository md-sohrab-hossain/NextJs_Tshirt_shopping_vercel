import { mapModifiers } from 'libs/component';
import React from 'react';

const Table = ({ children, tHead }) => {
  const componentClassName = mapModifiers('a-table');
  const className = `${componentClassName}`.trim();

  return (
    <div className={className}>
      <table className="a-table__container">
        <thead className="a-table__container--head">
          <tr>{tHead && tHead.map(item => <th key={item}>{item}</th>)}</tr>
        </thead>
        <tbody className="a-table__container--body">{children}</tbody>
      </table>
    </div>
  );
};

export default Table;
