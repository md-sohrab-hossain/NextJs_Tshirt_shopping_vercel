import React from 'react';
import Pagination from './';

export default {
  title: 'components/atoms/Pagination',
  component: Pagination,
  parameters: {
    paddings: {
      default: 'small',
    },
    backgrounds: {
      default: 'gray',
    },
  },
};

const Template = args => <Pagination {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  activePage: 1,
  resultPerPage: 3,
  itemsCount: 6,
};
