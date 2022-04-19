import { QUANTITY, SIZE } from 'constants/options';
import React from 'react';
import ProductDesign from './';

export default {
  title: 'components/organisms/ProductDesign',
  component: ProductDesign,
  parameters: {
    paddings: {
      default: 'small',
    },
    backgrounds: {
      default: 'gray',
    },
  },
};

const Template = args => <ProductDesign {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  size: SIZE,
  quantity: QUANTITY,
  imgSrc: 'https://res.cloudinary.com/sajal-cnq/image/upload/v1624538021/tshirt/products/ezafikjm5prqocue1fgl.png',
};
