import React from 'react';
import { mapModifiers } from '../../../libs/component';

const Grid = ({ children }) => {
  const componentClassName = mapModifiers('o-grid');
  const className = `${componentClassName}`.trim();

  return <div className={className}>{children}</div>;
};

export default Grid;
