import React from 'react';
import ErrorMessage from '.';

export default {
  title: 'components/atoms/ErrorMessage',
  component: ErrorMessage,
  parameters: {
    paddings: {
      default: 'small',
    },
    backgrounds: {
      default: 'gray',
    },
  },
};

const Template = args => <ErrorMessage {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  error: {
    Message:
      'A timeout error has occurred. Please wait for a while and try again. If the problem persists, please contact the help desk.',
    Code: '98765',
  },
};

export const Code = Template.bind({});
Code.args = {
  error: {
    Message:
      'A timeout error has occurred. Please wait for a while and try again. If the problem persists, please contact the help desk.',
    Code: '98765',
  },
};
