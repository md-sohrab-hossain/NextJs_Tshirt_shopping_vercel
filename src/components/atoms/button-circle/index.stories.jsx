import React from 'react';
import ButtonCircle from '.';

export default {
  title: 'components/atoms/ButtonCircle',
  component: ButtonCircle,
  parameters: {
    paddings: {
      default: 'small',
    },
    backgrounds: {
      default: 'gray',
    },
  },
};

const Template = args => <ButtonCircle {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
