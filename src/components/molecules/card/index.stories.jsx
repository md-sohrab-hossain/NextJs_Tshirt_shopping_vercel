import React from 'react';
import Card from './';

export default {
  title: 'components/molecules/Card',
  component: Card,
  parameters: {
    paddings: {
      default: 'small',
    },
    backgrounds: {
      default: 'gray',
    },
  },
};

const Template = args => <Card {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  product: {
    _id: 1,
    name: 'green T-shirt',
    price: 300,
    ratings: 3,
    numOfReviews: 0,
    images: [
      {
        url: 'http://localhost:3000/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fsajal-cnq%2Fimage%2Fupload%2Fv1624538055%2Ftshirt%2Fproducts%2Fumne2qegc1pgjy8e9boo.png&w=1920&q=75',
      },
    ],
  },
};
