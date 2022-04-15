import React from 'react';
import OrderItem from './';

export default {
  title: 'components/atoms/OrderItem',
  component: OrderItem,
  parameters: {
    paddings: {
      default: 'small',
    },
    backgrounds: {
      default: 'gray',
    },
  },
};

const Template = args => <OrderItem {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  imgUrl: 'https://res.cloudinary.com/sajal-cnq/image/upload/v1632479979/tshirt/products/p4puuezmzup7wqtljavx.png',
  name: 'Black T-shirt',
  quantity: 3,
  price: 300,
};
