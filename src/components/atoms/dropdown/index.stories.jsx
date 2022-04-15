import React from 'react';
import Dropdown from './';

export default {
  title: 'components/atoms/Dropdown',
  component: Dropdown,
  parameters: {
    paddings: {
      default: 'small',
    },
    backgrounds: {
      default: 'gray',
    },
  },
};

const Template = args => <Dropdown {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  quantity: [1, 2, 3, 4, 5, 6],
};
