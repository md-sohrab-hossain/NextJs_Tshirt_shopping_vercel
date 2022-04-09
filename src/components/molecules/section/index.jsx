import React from 'react';
import { mapModifiers } from '../../../libs/component';

//  modifiers:
//     | 'border'
//     | 'card'
//     | 'card-border'
//     | 'fill'
//     | 'fill-white'
//     | 'fullpage'
//     | 'pc-bg-none'
//     | 'sp-bg-none'
//     | 'head'
//     | 'tabs'
//     | 'side-by-side'
//;

//  padding:'none' | 'medium' | 'pc-none' | 'sp-none' | 'horizontal' | 'vertical' | 'vertical-medium' | 'vertical-large'

const Section = ({ children, modifiers, className: additionalClassName = '' }) => {
  const componentClassName = mapModifiers('m-section', modifiers);
  const className = `${componentClassName} ${additionalClassName}`.trim();

  return <section className={className}>{children}</section>;
};

export default Section;
