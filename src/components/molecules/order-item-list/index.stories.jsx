import React from 'react';
import OrderItemList from './';

export default {
  title: 'components/molecules/OrderItemList',
  component: OrderItemList,
  parameters: {
    paddings: {
      default: 'small',
    },
    backgrounds: {
      default: 'gray',
    },
  },
};

const Template = args => <OrderItemList {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  orders: [
    {
      images: [
        {
          url: 'https://res.cloudinary.com/sajal-cnq/image/upload/v1632479979/tshirt/products/p4puuezmzup7wqtljavx.png',
        },
      ],
      productInfo: [{ name: 'Black T-shirt' }],
      quantity: 3,
      price: 300,
    },
    {
      images: [
        {
          url: 'https://res.cloudinary.com/sajal-cnq/image/upload/v1632479979/tshirt/products/p4puuezmzup7wqtljavx.png',
        },
      ],
      productInfo: [{ name: 'Black T-shirt' }],
      quantity: 3,
      price: 300,
    },
    {
      images: [
        {
          url: 'https://res.cloudinary.com/sajal-cnq/image/upload/v1632479979/tshirt/products/p4puuezmzup7wqtljavx.png',
        },
      ],
      productInfo: [{ name: 'Black T-shirt' }],
      quantity: 3,
      price: 300,
    },
    {
      images: [
        {
          url: 'https://res.cloudinary.com/sajal-cnq/image/upload/v1632479979/tshirt/products/p4puuezmzup7wqtljavx.png',
        },
      ],
      productInfo: [{ name: 'Black T-shirt' }],
      quantity: 3,
      price: 300,
    },
    {
      images: [
        {
          url: 'https://res.cloudinary.com/sajal-cnq/image/upload/v1632479979/tshirt/products/p4puuezmzup7wqtljavx.png',
        },
      ],
      productInfo: [{ name: 'Black T-shirt' }],
      quantity: 3,
      price: 300,
    },
    {
      images: [
        {
          url: 'https://res.cloudinary.com/sajal-cnq/image/upload/v1632479979/tshirt/products/p4puuezmzup7wqtljavx.png',
        },
      ],
      productInfo: [{ name: 'Black T-shirt' }],
      quantity: 3,
      price: 300,
    },
    {
      images: [
        {
          url: 'https://res.cloudinary.com/sajal-cnq/image/upload/v1632479979/tshirt/products/p4puuezmzup7wqtljavx.png',
        },
      ],
      productInfo: [{ name: 'Black T-shirt' }],
      quantity: 3,
      price: 300,
    },
    {
      images: [
        {
          url: 'https://res.cloudinary.com/sajal-cnq/image/upload/v1632479979/tshirt/products/p4puuezmzup7wqtljavx.png',
        },
      ],
      productInfo: [{ name: 'Black T-shirt' }],
      quantity: 3,
      price: 300,
    },
    {
      images: [
        {
          url: 'https://res.cloudinary.com/sajal-cnq/image/upload/v1632479979/tshirt/products/p4puuezmzup7wqtljavx.png',
        },
      ],
      productInfo: [{ name: 'Black T-shirt' }],
      quantity: 3,
      price: 300,
    },
    {
      images: [
        {
          url: 'https://res.cloudinary.com/sajal-cnq/image/upload/v1632479979/tshirt/products/p4puuezmzup7wqtljavx.png',
        },
      ],
      productInfo: [{ name: 'Black T-shirt' }],
      quantity: 3,
      price: 300,
    },
  ],
};
