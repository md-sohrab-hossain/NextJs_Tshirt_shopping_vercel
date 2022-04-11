import React from 'react';
import ListItem from './';

export default {
  title: 'components/atoms/ListItem',
  component: ListItem,
  parameters: {
    paddings: {
      default: 'small',
    },
    backgrounds: {
      default: 'gray',
    },
  },
};

const Template = args => <ListItem {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  children: 'new component',
};
