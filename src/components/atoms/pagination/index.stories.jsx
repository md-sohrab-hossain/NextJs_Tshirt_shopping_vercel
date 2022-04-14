import React from 'react';
import Pagination from '.';

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
  length: 10,
  currentIndex: 1,
  onChange: index => console.log(`page ${index} has been selected`),
};

export const CenterPage = Template.bind({});
CenterPage.args = {
  length: 20,
  currentIndex: 5,
  onChange: index => console.log(`page ${index} has been selected`),
};

export const SinglePage = Template.bind({});
SinglePage.args = {
  length: 1,
  currentIndex: 1,
  onChange: index => console.log(`page ${index} has been selected`),
};

export const FewPages = Template.bind({});
FewPages.args = {
  length: 3,
  currentIndex: 1,
  onChange: index => console.log(`page ${index} has been selected`),
};

export const LastPage = Template.bind({});
LastPage.args = {
  length: 99,
  currentIndex: 98,
  onChange: index => console.log(`page ${index} has been selected`),
};
