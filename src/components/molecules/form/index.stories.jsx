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
  children: <Heading>Login</Heading>,
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
  children: <Heading>Join Us</Heading>,
};

export const UpdateUser = Template.bind({});
UpdateUser.args = {
  hasName: true,
  hasEmail: true,
  hasRole: true,
  children: <Heading>Update User</Heading>,
  btnMessage: 'Update',
  modifiers: 'update-user',
};

export const NewProduct = Template.bind({});
NewProduct.args = {
  hasName: true,
  hasPrice: true,
  hasDescription: true,
  hasMultipleImages: true,
  children: <Heading>New Product</Heading>,
  btnMessage: 'Create',
  modifiers: 'create-new-product',
};

export const ForgotPassword = Template.bind({});
ForgotPassword.args = {
  hasEmail: true,
  children: <Heading>Forgot Password?</Heading>,
  btnMessage: 'Send Email',
  modifiers: 'forgot-password',
};
