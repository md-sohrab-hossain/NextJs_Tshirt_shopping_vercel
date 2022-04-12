import { mapModifiers } from 'libs/component';
import React from 'react';

const Text = ({ children, size, weight, colors, align = 'left', className: additionalClassName = '' }) => {
  const componentClassName = mapModifiers(
    'a-text',
    size && `size-${size}`,
    weight && `weight-${weight}`,
    colors && `color-${colors}`,
    align && `align-${align}`
  );
  const className = `${componentClassName} ${additionalClassName}`.trim();
  return <p className={className}>{children}</p>;
};

export default Text;
