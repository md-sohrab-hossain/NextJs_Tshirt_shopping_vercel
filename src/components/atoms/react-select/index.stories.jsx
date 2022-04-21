import { QUANTITY } from 'constants/options';
import React from 'react';
import ReactSelect from '.';

export default {
  title: 'components/atoms/ReactSelect',
  component: ReactSelect,
  parameters: {
    paddings: {
      default: 'small',
    },
    backgrounds: {
      default: 'gray',
    },
  },
};

const Template = args => <ReactSelect {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  options: QUANTITY,
  placeholder: 'Select...',
};

export const WithDefaultValue = Template.bind({});
WithDefaultValue.args = {
  options: QUANTITY,
  placeholder: 'Select...',
  defaultValue: { label: '1', value: '1' },
};
