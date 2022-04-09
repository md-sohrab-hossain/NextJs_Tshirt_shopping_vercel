import React from 'react';
import { mapModifiers } from '../../../libs/component';

const Section = ({ children, modifiers, className: additionalClassName = '' }) => {
  const componentClassName = mapModifiers('m-section', modifiers);
  const className = `${componentClassName} ${additionalClassName}`.trim();

  return <section className={className}>{children}</section>;
};

export default Section;
