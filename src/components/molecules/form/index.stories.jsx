import Heading from 'components/atoms/heading';
import React from 'react';
import Form from './';

export default {
  title: 'components/molecules/Form',
  component: Form,
  parameters: {
    paddings: {
      default: 'small',
    },
    backgrounds: {
      default: 'gray',
    },
  },
};

const Template = args => <Form {...args} />;

export const LoginForm = Template.bind({});
LoginForm.args = {
  hasEmail: true,
  hasPassword: true,
  isForgotPassword: true,
  isNewUser: true,
  children: <Heading large>Login</Heading>,
  btnMessage: 'Login',
  modifiers: 'login',
};

export const RegisterForm = Template.bind({});
RegisterForm.args = {
  hasName: true,
  isNameRequired: true,
  hasEmail: true,
  isEmailRequired: true,
  hasPassword: true,
  isPasswordRequired: true,
  hasAvatar: true,
  imgSrc: 'https://next-js-tshirt-shopping-7dltd6ofj-sajalkhan.vercel.app/images/default_avatar.jpg',
  btnMessage: 'Register',
  children: <Heading large>Join Us</Heading>,
};

export const ForgotPassword = Template.bind({});
ForgotPassword.args = {
  hasEmail: true,
  children: <Heading>Forgot Password?</Heading>,
  btnMessage: 'Send Email',
  modifiers: 'forgot-password',
};
