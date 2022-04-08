---
to: src/components/<%= component %>/<%= h.toLowercase(name) %>/index.stories.jsx
---
import React from 'react';
import { ComponentMeta, ComponentStory  } from '@storybook/react';
import { <%= h.toPascalCase(name) %> } from './';

export default {
  title: 'components/<%= component %>/<%= h.toPascalCase(name) %>',
  component: <%= h.toPascalCase(name) %>,
  parameters: {
    paddings: {
      default: 'small',
    },
    backgrounds: {
      default: 'gray',
    },
  },
};

const Template = args => <<%= h.toPascalCase(name) %> {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  children: 'ボタン',
};
