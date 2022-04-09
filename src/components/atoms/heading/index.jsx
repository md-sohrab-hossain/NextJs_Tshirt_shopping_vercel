import React from 'react';
import { mapModifiers } from '../../../libs/component';

export const Heading = props => {
  const componentClassName = mapModifiers('a-heading');
  const className = `${componentClassName}`.trim();

  return <div className={className}>{props.children}</div>;
};
