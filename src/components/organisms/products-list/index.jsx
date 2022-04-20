import Button from 'components/atoms/button';
import Heading from 'components/atoms/heading';
import Icon from 'components/atoms/icon';
import Pagination from 'components/atoms/pagination';
import Table from 'components/atoms/table';
import Section from 'components/molecules/section';
import { PRODUCTS_DETAILS_TABLE_COLUMN } from 'constants/options';
import { ROUTES } from 'constants/routes';
import { mapModifiers } from 'libs/component';
import { formatLocalDateString } from 'libs/utils';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

const ProductsList = ({ totalProducts, products, activePage, handlePagination, handleRemove }) => {
  const componentClassName = mapModifiers('o-products-list');
  const className = `${componentClassName}`.trim();

  const totalPages = parseInt(totalProducts / 4) + (totalProducts % 4 > 0 ? 1 : 0);

  return (
    <>
      <Head>
        <title>Products List</title>
      </Head>

      <div className={className}>
        <Section modifiers="side-by-side">
          <Heading large>{totalProducts} Products</Heading>
          <Link href={`${ROUTES.CREATE_NEW_PRODUCT}`}>
            <a>
              <Button modifiers="success" size="small">
                Create New
              </Button>
            </a>
          </Link>
        </Section>

        <div className="o-products-list__details">
          <Table tHead={PRODUCTS_DETAILS_TABLE_COLUMN}>
            {products?.map(item => (
              <tr key={item._id}>
                <td>{item._id}</td>
                <td>{item.name}</td>
                <td>{item.price}/=</td>
                <td>{item.description}</td>
                <td>{item.ratings}</td>
                <td>{formatLocalDateString(item.createdAt)}</td>
                <td>
                  <Link href={`${ROUTES.ADMIN_PRODUCT_EDIT}/${item._id}`}>
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

        <Pagination length={totalPages} currentIndex={activePage} onChange={handlePagination} />
      </div>
    </>
  );
};

export default ProductsList;
