import Text from 'components/atoms/text';
import { mapModifiers } from 'libs/component';
import React from 'react';

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
