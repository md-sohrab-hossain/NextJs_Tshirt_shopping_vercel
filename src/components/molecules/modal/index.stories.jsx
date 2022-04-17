import React from 'react';
import Modal from './';

export default {
  title: 'components/molecules/Modal',
  component: Modal,
  parameters: {
    paddings: {
      default: 'small',
    },
    backgrounds: {
      default: 'gray',
    },
  },
};

const Template = args => <Modal {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  message: 'Are you sure?',
};
