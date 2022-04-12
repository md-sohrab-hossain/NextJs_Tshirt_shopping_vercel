import React from 'react';
import LoginForm from './';

export default {
  title: 'components/molecules/LoginForm',
  component: LoginForm,
  parameters: {
    paddings: {
      default: 'small',
    },
    backgrounds: {
      default: 'gray',
    },
  },
};

const Template = args => <LoginForm {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
