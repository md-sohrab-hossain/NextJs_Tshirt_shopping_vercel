import React from 'react';
import { mapModifiers } from '../../../libs/component';
import Text from '../text';

const Footer = () => {
  const data = new Date();
  const componentClassName = mapModifiers('a-footer');
  const className = `${componentClassName}`.trim();

  return (
    <div className={className}>
      <Text>T-shirt Shopping {data.getFullYear()} &copy; sohrab hossain</Text>
    </div>
  );
};

export default Footer;
