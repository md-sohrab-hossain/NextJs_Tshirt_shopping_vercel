import React from 'react';
import ShoppingCartItemsList from '.';

export default {
  title: 'components/molecules/ShoppingCartItemsList',
  component: ShoppingCartItemsList,
  parameters: {
    paddings: {
      default: 'small',
    },
    backgrounds: {
      default: 'gray',
    },
  },
};

const Template = args => <ShoppingCartItemsList {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  products: {
    orders: [
      {
        _id: 1,
        images: [
          {
            url: 'http://localhost:3000/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fsajal-cnq%2Fimage%2Fupload%2Fv1624538055%2Ftshirt%2Fproducts%2Fumne2qegc1pgjy8e9boo.png&w=1920&q=75',
          },
        ],
        productInfo: [{ name: 'Black T-shirt' }],
        price: 300,
      },
      {
        _id: 2,
        images: [
          {
            url: 'http://localhost:3000/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fsajal-cnq%2Fimage%2Fupload%2Fv1624538055%2Ftshirt%2Fproducts%2Fumne2qegc1pgjy8e9boo.png&w=1920&q=75',
          },
        ],
        productInfo: [{ name: 'Green T-shirt' }],
        price: 350,
      },
      {
        _id: 3,
        images: [
          {
            url: 'http://localhost:3000/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fsajal-cnq%2Fimage%2Fupload%2Fv1624538055%2Ftshirt%2Fproducts%2Fumne2qegc1pgjy8e9boo.png&w=1920&q=75',
          },
        ],
        productInfo: [{ name: 'Green T-shirt' }],
        price: 350,
      },
      {
        _id: 4,
        images: [
          {
            url: 'http://localhost:3000/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fsajal-cnq%2Fimage%2Fupload%2Fv1624538055%2Ftshirt%2Fproducts%2Fumne2qegc1pgjy8e9boo.png&w=1920&q=75',
          },
        ],
        productInfo: [{ name: 'Green T-shirt' }],
        price: 350,
      },
      {
        _id: 5,
        images: [
          {
            url: 'http://localhost:3000/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fsajal-cnq%2Fimage%2Fupload%2Fv1624538055%2Ftshirt%2Fproducts%2Fumne2qegc1pgjy8e9boo.png&w=1920&q=75',
          },
        ],
        productInfo: [{ name: 'Green T-shirt' }],
        price: 350,
      },
      {
        _id: 6,
        images: [
          {
            url: 'http://localhost:3000/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fsajal-cnq%2Fimage%2Fupload%2Fv1624538055%2Ftshirt%2Fproducts%2Fumne2qegc1pgjy8e9boo.png&w=1920&q=75',
          },
        ],
        productInfo: [{ name: 'Green T-shirt' }],
        price: 350,
      },
    ],
  },
};

export const Empty = Template.bind({});
Empty.args = {
  products: [],
};
