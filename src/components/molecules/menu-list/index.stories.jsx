import React from 'react';
import ListItem from '../../atoms/list-item';
import MenuList from './';

export default {
  title: 'components/molecules/MenuList',
  component: MenuList,
  parameters: {
    paddings: {
      default: 'small',
    },
    backgrounds: {
      default: 'gray',
    },
  },
};

const Template = args => <MenuList {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  children: [
    <ListItem key="1">Products</ListItem>,
    <ListItem key="2">My Order</ListItem>,
    <ListItem key="3">Profile</ListItem>,
    <ListItem key="4">Logout</ListItem>,
  ],
};
