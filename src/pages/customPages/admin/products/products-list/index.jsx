import Loading from 'components/atoms/Loading';
import Modal from 'components/molecules/modal';
import AllProductsList from 'components/organisms/all-products-list';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { clearErrors, deleteProduct, getAdminProducts } from 'redux/actions/productAction';
import { DELETE_PRODUCT_RESET } from 'redux/types/productsType';

const ProductsList = ({ props }) => {
  const session = useSession();
  const router = useRouter();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [removeProduct, setRemoveProduct] = useState(null);

  let { page = 1 } = router.query;
  page = Number(page);

  const { loading, products, productsCount, error } = props.products;
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

  const handleRemove = useCallback(id => {
    setRemoveProduct(id);
    setIsModalOpen(true);
  }, []);

  const handleModal = useCallback((isRemoved, id) => {
    setIsModalOpen(false);
    isRemoved && dispatch(deleteProduct(id));
  }, []);

  if (!session) {
    router.push('/');
  }

  if (loading) return <Loading square />;

  return (
    <div className="p-product-info-list">
      <AllProductsList
        products={products}
        totalProducts={productsCount}
        activePage={page}
        handlePagination={handlePagination}
        handleRemove={handleRemove}
      />
      {isModalOpen && (
        <Modal message="Do you want to remove this item?" onClick={handleModal} removeProductId={removeProduct} />
      )}
    </div>
  );
};

ProductsList.getInitialProps = async ({ req, query, store }) => {
  await store.dispatch(getAdminProducts(req, query.page));

  const product = store.getState();
  const products = product.getAllProductsAdmin;

  return {
    props: { products },
  };
};

export default ProductsList;
