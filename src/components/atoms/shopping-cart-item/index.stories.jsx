import React from 'react';
import ShoppingCartItem from '.';

export default {
  title: 'components/atoms/ShoppingCartItem',
  component: ShoppingCartItem,
  parameters: {
    paddings: {
      default: 'small',
    },
    backgrounds: {
      default: 'gray',
    },
  },
};

const Template = args => <ShoppingCartItem {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  imgUrl:
    'http://localhost:3000/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fsajal-cnq%2Fimage%2Fupload%2Fv1624538055%2Ftshirt%2Fproducts%2Fumne2qegc1pgjy8e9boo.png&w=1920&q=75',
  productId: '0001',
  productName: 'Black T-shirt',
  price: 300,
};
