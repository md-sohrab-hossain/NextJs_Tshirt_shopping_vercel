import React from 'react';
import ReactPaginations from '.';

export default {
  title: 'components/atoms/ReactPagination',
  component: ReactPaginations,
  parameters: {
    paddings: {
      default: 'small',
    },
    backgrounds: {
      default: 'gray',
    },
  },
};

const Template = args => <ReactPaginations {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  activePage: 1,
  resultPerPage: 3,
  itemsCount: 6,
};
