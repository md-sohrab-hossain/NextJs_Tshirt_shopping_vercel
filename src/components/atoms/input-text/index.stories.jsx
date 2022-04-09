import React from 'react';
import InputText from './';

export default {
  title: 'components/atoms/InputText',
  component: InputText,
  parameters: {
    paddings: {
      default: 'small',
    },
    backgrounds: {
      default: 'gray',
    },
  },
};

const Template = args => <InputText {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  placeholder: 'Search..',
  type: 'email',
};
