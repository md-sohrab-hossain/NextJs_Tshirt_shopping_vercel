import { mapModifiers } from 'libs/component';
import React from 'react';

const ListItem = ({ children }) => {
  const componentClassName = mapModifiers('a-list-item');
  const className = `${componentClassName}`.trim();

  return <div className={className}>{children}</div>;
};

export default ListItem;
