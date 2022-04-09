import React from 'react';
import { Heading } from './';

export default {
  title: 'components/atoms/Heading',
  component: Heading,
  parameters: {
    paddings: {
      default: 'small',
    },
    backgrounds: {
      default: 'gray',
    },
  },
};

const Template = args => <Heading {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  children: 'ボタン',
};
