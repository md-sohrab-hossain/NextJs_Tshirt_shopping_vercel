//? -- library -- */
import Link from 'next/link';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Pagination from 'react-js-pagination';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/client';
//? -- library -- */

//? -- components -- */
import Loading from '../atoms/Loading';
import DeleteModal from '../atoms/DeleteModal';
//? -- components -- */

//? -- redux -- */
import { deleteProduct, clearErrors } from '../../redux/actions/productAction';
import { DELETE_PRODUCT_RESET } from '../../redux/types/productsType';
//? -- redux -- */

//? -- css -- */
import style from './allProducts.module.scss';
//? -- css -- */

const AllProducts = ({ productsData }) => {
  const [openModal, setOpenModal] = useState({
    id: null,
    open: false,
  });

  const session = useSession();
  const router = useRouter();
  const dispatch = useDispatch();
  let { page = 1 } = router.query;
  page = Number(page);

  const { loading, products, productsCount, error, resultPerPage } = productsData;

  const { error: deleteError, isDeleted } = useSelector(state => state.product);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.warning('🚀 Product Deleted!');
      router.push(window.location.href);
      dispatch({ type: DELETE_PRODUCT_RESET });
    }
  }, [dispatch, deleteError, error, isDeleted]);

  const handlePagination = pageNumber => {
    let url = window.location.href + `/?page=${pageNumber}`;

    url = url.replace(/\b\?page=([1-9])(\/)?/g, '');

    router.push(url);
  };

  let count = productsCount;

  const deleteProductHandler = useCallback((id, Delete) => {
    if (Delete) {
      dispatch(deleteProduct(id));
    }
    setOpenModal({ open: false, id: id });
  }, []);

  if (!session) {
    router.push('/');
  }
  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <div className={style.AllProducts}>
        <div className={style.AllProducts__info}>
          <Link href="/customPages/admin/products/createNew">
            <a className={style.AllProducts__info__create}> Create New</a>
          </Link>

          <h2 className={style.AllProducts__info__count}>{`${count} Products`}</h2>

          <table className={style.AllProducts__info__table}>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Price</th>
                <th>Description</th>
                <th>Ratings</th>
                <th>Created Date</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {products &&
                products.map(item => (
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
                      <>
                        <Link href={`/customPages/admin/products/${item._id}`}>
                          <a className="btn btn-primary">
                            <i className="fa fa-pencil"></i>
                          </a>
                        </Link>

                        <button
                          className="btn btn-danger mx-1"
                          onClick={() => setOpenModal({ id: item._id, open: true })}
                        >
                          <i className="fa fa-trash"></i>
                        </button>
                      </>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {resultPerPage < count && (
          <div className={style.AllProducts__pagination}>
            <Pagination
              activePage={page}
              itemsCountPerPage={resultPerPage}
              totalItemsCount={productsCount}
              onChange={handlePagination}
              nextPageText={'Next'}
              prevPageText={'Prev'}
              firstPageText={'First'}
              lastPageText={'Last'}
              itemClass="page-item"
              linkClass="page-link"
            />
          </div>
        )}
      </div>
      <DeleteModal message="Do you want to delete?" handleOpen={openModal} handleDelete={deleteProductHandler} />
    </>
  );
};

export default AllProducts;
