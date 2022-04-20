import Button from 'components/atoms/button';
import Heading from 'components/atoms/heading';
import Icon from 'components/atoms/icon';
import Pagination from 'components/atoms/pagination';
import Table from 'components/atoms/table';
import Section from 'components/molecules/section';
import { mapModifiers } from 'libs/component';
import Head from 'next/head';
import React from 'react';

const AllProductsInfoList = ({ totalProducts, products, activePage, handlePagination, handleEdit, handleDelete }) => {
  const componentClassName = mapModifiers('o-all-products-info-list');
  const className = `${componentClassName}`.trim();

  const totalPages = parseInt(totalProducts / 4) + (totalProducts % 4 > 0 ? 1 : 0);

  return (
    <>
      <Head>
        <title>Products List</title>
      </Head>

      <div className={className}>
        <Section modifiers="side-by-side">
          <Heading tag="h1">{totalProducts} Products</Heading>
          <Button modifiers="success" size="small">
            Create New
          </Button>
        </Section>

        <div className="o-all-products-info-list__details">
          <Table>
            {products?.map(item => (
              <tr key={item._id}>
                <td>{item._id}</td>
                <td>{item.name}</td>
                <td>{item.price}/=</td>
                <td>{item.description}</td>
                <td>{item.ratings}</td>
                <td>
                  {new Date(item.createdAt).toLocaleDateString([], {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </td>
                <td>
                  <Icon name="edit" onClick={handleEdit} />
                  <Icon name="delete" onClick={handleDelete} />
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

export default AllProductsInfoList;
