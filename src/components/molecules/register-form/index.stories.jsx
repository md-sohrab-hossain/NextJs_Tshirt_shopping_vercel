import React from 'react';
import RegisterForm from './';

export default {
  title: 'components/molecules/RegisterForm',
  component: RegisterForm,
  parameters: {
    paddings: {
      default: 'small',
    },
    backgrounds: {
      default: 'gray',
    },
  },
};

const Template = args => <RegisterForm {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  imgSrc: 'https://next-js-tshirt-shopping-7dltd6ofj-sajalkhan.vercel.app/images/default_avatar.jpg',
};
