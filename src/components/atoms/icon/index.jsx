import React from 'react';
import { mapModifiers } from '../../../libs/component';

const Icon = ({ name, className: additionalClassName = '', onClick }) => {
  const componentClassName = mapModifiers('a-icon', name);
  const className = `${componentClassName} ${additionalClassName}`.trim();

  return <i onClick={onClick} className={className} />;
};

export default Icon;
