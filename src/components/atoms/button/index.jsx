import React from 'react';
import { mapModifiers } from 'libs/component';

export const Button = props => {
  const componentClassName = mapModifiers('a-button');
  const className = `${componentClassName}`.trim();

  return <div className={className}>{props.children}</div>;
};
