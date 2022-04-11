import React from 'react';
import Navbar from './';

export default {
  title: 'components/molecules/Navbar',
  component: Navbar,
  parameters: {
    paddings: {
      default: 'small',
    },
    backgrounds: {
      default: 'gray',
    },
  },
};

const Template = args => <Navbar {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
