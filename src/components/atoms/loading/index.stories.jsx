import React from 'react';
import Loading from '.';

export default {
  title: 'components/atoms/Loading',
  component: Loading,
  parameters: {
    paddings: {
      default: 'small',
    },
    backgrounds: {
      default: 'gray',
    },
  },
};

const Template = args => <Loading {...args} />;

export const Normal = Template.bind({});
Normal.args = {};

export const LoadingOverly = Template.bind({});
LoadingOverly.args = {
  overlay: true,
};

export const LoadingSquare = Template.bind({});
LoadingSquare.args = {
  square: true,
};
