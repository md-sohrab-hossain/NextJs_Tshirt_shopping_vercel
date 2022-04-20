import React from 'react';
import ProductsList from '.';

export default {
  title: 'components/organisms/ProductsList',
  component: ProductsList,
  parameters: {
    paddings: {
      default: 'small',
    },
    backgrounds: {
      default: 'gray',
    },
  },
};

const Template = args => <ProductsList {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  totalProducts: 9,
  activePage: 1,
  products: [
    {
      _id: '60d32c2f878c1d3034e843d3',
      name: 'Black T-shirt',
      price: 300,
      description: 'new arrival',
      ratings: 5,
      createdAt: '2021-06-23T12:42:17.753Z',
    },
    {
      _id: '60d32c2f878c1d3034e843d3',
      name: 'White T-shirt',
      price: 350,
      description: 'new arrival',
      ratings: 4,
      createdAt: '2021-05-23T12:42:17.753Z',
    },
    {
      _id: '60d32c2f878c1d3034e843d3',
      name: 'Green T-shirt',
      price: 300,
      description: 'new arrival',
      ratings: 5,
      createdAt: '2021-06-23T12:42:17.753Z',
    },
  ],
};
