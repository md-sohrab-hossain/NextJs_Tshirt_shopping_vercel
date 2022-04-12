import React from 'react';
import Rating from '.';

export default {
  title: 'components/atoms/Rating',
  component: Rating,
  parameters: {
    paddings: {
      default: 'small',
    },
    backgrounds: {
      default: 'gray',
    },
  },
};

const Template = args => <Rating {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  ratings: 2,
  id: 1123,
};
