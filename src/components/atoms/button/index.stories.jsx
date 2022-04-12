import React from 'react';
import Button from './';

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
  children: 'click me',
};

export const Primary = Template.bind({});
Primary.args = {
  children: 'click me',
  modifiers: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'click me',
  modifiers: 'secondary',
};

export const Third = Template.bind({});
Third.args = {
  children: 'click me',
  modifiers: 'third',
};

export const Fourth = Template.bind({});
Fourth.args = {
  children: 'click me',
  modifiers: 'fourth',
};

export const Upload = Template.bind({});
Upload.args = {
  children: 'click me',
  modifiers: 'upload',
};

export const Transparent = Template.bind({});
Transparent.args = {
  children: 'click me',
  modifiers: 'transparent',
};

export const Red = Template.bind({});
Red.args = {
  children: 'click me',
  modifiers: 'red',
};

export const Violet = Template.bind({});
Violet.args = {
  children: 'click me',
  modifiers: ['violet', 'animated'],
};

export const Success = Template.bind({});
Success.args = {
  children: 'click me',
  modifiers: 'success',
};

export const Indigo = Template.bind({});
Indigo.args = {
  children: 'click me',
  modifiers: 'indigo',
};

export const Text = Template.bind({});
Text.args = {
  children: 'click me',
  modifiers: 'text',
};

export const IconText = Template.bind({});
IconText.args = {
  children: 'click me',
  modifiers: 'icon-text',
  icon: 'login',
};
