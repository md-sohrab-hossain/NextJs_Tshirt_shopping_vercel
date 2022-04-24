import Icon from 'components/atoms/icon';
import Table from 'components/atoms/table';
import { ALL_USERS_TABLE_COLUMN } from 'constants/options';
import { mapModifiers } from 'libs/component';
import { formatLocalDateString } from 'libs/utils';
import Head from 'next/head';
import React from 'react';

const UsersList = ({ users, handleRemove, handleEdit }) => {
  const componentClassName = mapModifiers('o-users-list');
  const className = `${componentClassName}`.trim();

  return (
    <>
      <Head>
        <title>Users List</title>
      </Head>

      <div className={className}>
        <Table tHead={ALL_USERS_TABLE_COLUMN}>
          {users?.map(item => (
            <tr key={item._id}>
              <td>
                <img src={item?.avatar?.url} alt={item?.name || 'name'} draggable="false" />
              </td>
              <td>{item._id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.role}</td>
              <td>{formatLocalDateString(item.createdAt)}</td>
              <td>
                <Icon name="edit" onClick={() => handleEdit && handleEdit(item._id)} />
                <Icon name="delete" onClick={() => handleRemove && handleRemove(item._id)} />
              </td>
            </tr>
          ))}
        </Table>
      </div>
    </>
  );
};

export default UsersList;
