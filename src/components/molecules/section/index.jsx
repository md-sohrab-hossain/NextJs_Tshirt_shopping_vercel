import { mapModifiers, mapModifiersPrefix } from 'libs/component';
import React from 'react';

const Section = ({ children, modifiers, padding, className: additionalClassName = '' }) => {
  const componentClassName = mapModifiers('m-section', modifiers, padding && mapModifiersPrefix('padding', padding));
  const className = `${componentClassName} ${additionalClassName}`.trim();

  return <section className={className}>{children}</section>;
};

export default Section;
