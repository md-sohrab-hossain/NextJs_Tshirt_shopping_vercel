import React from 'react';
import Footer from './';

export default {
  title: 'components/atoms/Footer',
  component: Footer,
  parameters: {
    paddings: {
      default: 'small',
    },
    backgrounds: {
      default: 'gray',
    },
  },
};

const Template = args => <Footer {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
