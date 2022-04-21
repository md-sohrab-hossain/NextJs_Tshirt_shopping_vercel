import React from 'react';
import TextArea from './';

export default {
  title: 'components/atoms/TextArea',
  component: TextArea,
  parameters: {
    paddings: {
      default: 'small',
    },
    backgrounds: {
      default: 'gray',
    },
  },
};

const Template = args => <TextArea {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  placeholder: 'Enter description..',
};
