import { mapModifiers } from 'libs/component';
import React from 'react';

const Grid = ({ children }) => {
  const componentClassName = mapModifiers('o-grid');
  const className = `${componentClassName}`.trim();

  return <div className={className}>{children}</div>;
};

export default Grid;
