import React from 'react';
import ShoppingCart from '.';

export default {
  title: 'components/atoms/ShoppingCart',
  component: ShoppingCart,
  parameters: {
    paddings: {
      default: 'small',
    },
    backgrounds: {
      default: 'gray',
    },
  },
};

const Template = args => <ShoppingCart {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
