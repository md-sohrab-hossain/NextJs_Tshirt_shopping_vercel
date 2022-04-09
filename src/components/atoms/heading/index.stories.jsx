import React from 'react';
import Heading from '.';

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
  children: 'This is a heading',
};

export const TagH1 = Template.bind({});
TagH1.args = {
  children: 'This is a heading',
  tag: 'h1',
};

export const TagH2 = Template.bind({});
TagH2.args = {
  children: 'This is a heading',
  tag: 'h2',
};

export const TagH3 = Template.bind({});
TagH3.args = {
  children: 'This is a heading',
  tag: 'h3',
};

export const TagH4 = Template.bind({});
TagH4.args = {
  children: 'This is a heading',
  tag: 'h4',
};

export const TagH5 = Template.bind({});
TagH5.args = {
  children: 'This is a heading',
  tag: 'h5',
};

export const Large = Template.bind({});
Large.args = {
  large: true,
  children: 'This is a heading',
};
