import React from 'react';
import { Button } from './';

export default {
  title: 'components/atoms/Button',
  component: Button,
  parameters: {
    paddings: {
      default: 'small',
    },
    backgrounds: {
      default: 'gray',
    },
  },
};

const Template = args => <Button {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  children: 'ボタン',
};
