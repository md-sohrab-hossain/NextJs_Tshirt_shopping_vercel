import React from 'react';
import Icon from '.';

export default {
  title: 'components/atoms/Icon',
  component: Icon,
  parameters: {
    paddings: {
      default: 'small',
    },
    backgrounds: {
      default: 'gray',
    },
  },
};

const Template = args => <Icon {...args} />;

export const LogIn = Template.bind({});
export const LogeOut = Template.bind({});
export const ShoppingBag = Template.bind({});
export const ExpandMore = Template.bind({});
export const ExpandLess = Template.bind({});
export const ArrowLeft = Template.bind({});
export const ArrowRight = Template.bind({});
export const ArrowLeftGrayActive = Template.bind({});
export const ArrowLeftGrayInactive = Template.bind({});
export const ArrowRightGrayActive = Template.bind({});
export const ArrowRightGrayInactive = Template.bind({});
export const Close = Template.bind({});

ArrowLeft.args = { name: 'arrow-left' };
ArrowRight.args = { name: 'arrow-right' };
ArrowLeftGrayActive.args = { name: 'arrow-left-gray-active' };
ArrowLeftGrayInactive.args = { name: 'arrow-left-gray-inactive' };
ArrowRightGrayActive.args = { name: 'arrow-right-gray-active' };
ArrowRightGrayInactive.args = { name: 'arrow-right-gray-inactive' };
ExpandMore.args = { name: 'expand-more' };
ExpandLess.args = { name: 'expand-less' };
ShoppingBag.args = { name: 'shopping-bag' };
LogIn.args = { name: 'login' };
LogeOut.args = { name: 'logout' };
Close.args = { name: 'close' };
