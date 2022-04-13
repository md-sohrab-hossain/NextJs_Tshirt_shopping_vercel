import React from 'react';
import ForgotPassword from './';

export default {
  title: 'components/molecules/ForgotPassword',
  component: ForgotPassword,
  parameters: {
    paddings: {
      default: 'small',
    },
    backgrounds: {
      default: 'gray',
    },
  },
};

const Template = args => <ForgotPassword {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  children: 'new component',
};
