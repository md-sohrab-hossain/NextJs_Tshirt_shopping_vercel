import React from 'react';
import ProductDetails from './';

export default {
  title: 'components/organisms/ProductDetails',
  component: ProductDetails,
  parameters: {
    paddings: {
      default: 'small',
    },
    backgrounds: {
      default: 'gray',
    },
  },
};

const Template = args => <ProductDetails {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  title: 'Product Details',
  brandName: 'Black T-shirt',
  quantity: [1, 2, 3, 4, 5, 6],
  price: 300,
  description: 'new arrival',
  rating: 3,
  images: [
    {
      public_id: '123',
      url: 'https://res.cloudinary.com/sajal-cnq/image/upload/v1632479979/tshirt/products/p4puuezmzup7wqtljavx.png',
    },
    {
      public_id: '232',
      url: 'https://res.cloudinary.com/sajal-cnq/image/upload/v1624538021/tshirt/products/ezafikjm5prqocue1fgl.png',
    },
  ],
};
