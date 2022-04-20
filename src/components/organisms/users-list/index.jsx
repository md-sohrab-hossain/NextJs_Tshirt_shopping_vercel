import Heading from 'components/atoms/heading';
import Icon from 'components/atoms/icon';
import Table from 'components/atoms/table';
import { ALL_USERS_TABLE_COLUMN } from 'constants/options';
import { ROUTES } from 'constants/routes';
import { mapModifiers } from 'libs/component';
import { formatLocalDateString } from 'libs/utils';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

const UsersList = ({ users, totalUsers, handleRemove }) => {
  const componentClassName = mapModifiers('o-users-list');
  const className = `${componentClassName}`.trim();

  return (
    <>
      <Head>
        <title>Users List</title>
      </Head>

      <div className={className}>
        <Heading>{totalUsers} Products</Heading>

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
                <Link href={`${ROUTES.ADMIN_USER_EDIT}/${item._id}`}>
                  <a>
                    <Icon name="edit" />
                  </a>
                </Link>

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
