import Icon from 'components/atoms/icon';
import { ALL_USERS_TABLE_COLUMN, PRODUCTS_DETAILS_TABLE_COLUMN } from 'constants/options';
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

export const ProductsTable = Template.bind({});
ProductsTable.args = {
  tHead: PRODUCTS_DETAILS_TABLE_COLUMN,
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

export const UsersTable = Template.bind({});
UsersTable.args = {
  tHead: ALL_USERS_TABLE_COLUMN,
  children: [
    <tr>
      <td></td>
      <td>60d32c2f878c1d303</td>
      <td>Sajal Khan</td>
      <td> sajal@gmail.com</td>
      <td>Admin</td>
      <td>June 23, 2021</td>
      <td>
        <Icon name="edit" />
        <Icon name="delete" />
      </td>
    </tr>,
  ],
};
