import React from 'react';
import UsersList from './';

export default {
  title: 'components/organisms/UsersList',
  component: UsersList,
  parameters: {
    paddings: {
      default: 'small',
    },
    backgrounds: {
      default: 'gray',
    },
  },
};

const Template = args => <UsersList {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  totalUsers: 4,
  users: [
    {
      avatar: {
        url: 'https://res.cloudinary.com/sajal-cnq/image/upload/v1650180717/tshirt/avatar/jquozygurubhugvnb5bz.jpg',
      },
      _id: '60ce5db994e57101f',
      name: 'sajal khan admin',
      email: 'sajal@gmail.com',
      role: 'admin',
      createdAt: '2021-06-23T12:42:17.753Z',
    },
  ],
};
