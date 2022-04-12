import React from 'react';
import Text from '.';

export default {
  title: 'components/atoms/Text',
  component: Text,
  parameters: {
    paddings: {
      default: 'small',
    },
    backgrounds: {
      default: 'gray',
    },
  },
};

const Template = args => <Text {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  children: 'This is a text',
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  children: 'This is small text',
};
