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

export const ArrowLeft = Template.bind({});
ArrowLeft.args = {
  name: 'arrow-left',
};

export const ArrowRight = Template.bind({});
ArrowRight.args = {
  name: 'arrow-right',
};

export const Close = Template.bind({});
Close.args = {
  name: 'close',
};

export const ExpandMore = Template.bind({});
ExpandMore.args = {
  name: 'expand-more',
};

export const ExpandLess = Template.bind({});
ExpandLess.args = {
  name: 'expand-less',
};

export const LogeOut = Template.bind({});
LogeOut.args = {
  name: 'logout',
};

export const LogIn = Template.bind({});
LogIn.args = {
  name: 'login',
};

export const ShoppingBag = Template.bind({});
ShoppingBag.args = {
  name: 'shopping-bag',
};
