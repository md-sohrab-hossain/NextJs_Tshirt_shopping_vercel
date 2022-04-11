import React from 'react';
import UserInfo from './';

export default {
  title: 'components/atoms/UserInfo',
  component: UserInfo,
  parameters: {
    paddings: {
      default: 'small',
    },
    backgrounds: {
      default: 'gray',
    },
  },
};

const Template = args => <UserInfo {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  name: 'Md.Sohrab Hossain',
  imgUrl: 'https://res.cloudinary.com/sajal-cnq/image/upload/v1624201629/tshirt/avatar/fks16fk1s8wbatrxvl6p.jpg',
};
