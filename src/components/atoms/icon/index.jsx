import { mapModifiers } from 'libs/component';
import React from 'react';

const Icon = ({ name, className: additionalClassName = '', onClick }) => {
  const componentClassName = mapModifiers('a-icon', name);
  const className = `${componentClassName} ${additionalClassName}`.trim();

  return <i onClick={onClick} className={className} />;
};

export default Icon;
