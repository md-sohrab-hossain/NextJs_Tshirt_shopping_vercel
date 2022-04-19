import React from 'react';
import Editor from './';

export default {
  title: 'components/molecules/ImageEditor',
  component: Editor,
  parameters: {
    paddings: {
      default: 'small',
    },
    backgrounds: {
      default: 'gray',
    },
  },
};

const Template = args => <Editor {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  children: 'new component',
};
