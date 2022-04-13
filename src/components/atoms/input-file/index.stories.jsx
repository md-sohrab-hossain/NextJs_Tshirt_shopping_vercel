import React from 'react';
import InputFile from './';

export default {
  title: 'components/atoms/InputFile',
  component: InputFile,
  parameters: {
    paddings: {
      default: 'small',
    },
    backgrounds: {
      default: 'gray',
    },
  },
};

const Template = args => <InputFile {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  dataText: 'Choose File',
};
