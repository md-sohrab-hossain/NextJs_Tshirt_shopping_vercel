import Icon from 'components/atoms/icon';
import React from 'react';
import Table from './';

export default {
  title: 'components/atoms/Table',
  component: Table,
  parameters: {
    paddings: {
      default: 'small',
    },
    backgrounds: {
      default: 'gray',
    },
  },
};

const Template = args => <Table {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  children: [
    <tr>
      <td>60d32c2f878c1d303</td>
      <td>black T-shirt</td>
      <td> 300/=</td>
      <td>new arrival</td>
      <td>4</td>
      <td>June 23, 2021</td>
      <td>
        <Icon name="edit" />
        <Icon name="delete" />
      </td>
    </tr>,
  ],
};
