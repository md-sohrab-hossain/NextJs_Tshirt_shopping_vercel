import { useDeleteProduct } from 'api/useDeleteProduct';
import { useGetAdminProductsList } from 'api/useGetAdminProductsList';
import Loading from 'components/atoms/loading';
import Modal from 'components/molecules/modal';
import ProductsList from 'components/organisms/products-list';
import { useGetAbsoluteUrl } from 'libs/utils';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';
import { toast } from 'react-toastify';

const ProductListPage = () => {
  const session = useSession();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [removeProductId, setRemoveProductId] = useState(null);
  const [isShowLoading, setIsShowLoading] = useState(() => false);
  const [pageNumber, setPageNumber] = useState(() => 1);

  const absoluteUrl = useGetAbsoluteUrl();
  const { mutate: removeProduct } = useDeleteProduct();
  const { data, isLoading, refetch } = useGetAdminProductsList(absoluteUrl, pageNumber);

  const handlePagination = pageNumber => setPageNumber(pageNumber);

  const handleRemove = useCallback(id => {
    setRemoveProductId(id);
    setIsModalOpen(true);
  }, []);

  const handleModal = useCallback((isRemoved, id) => {
    setIsModalOpen(false);

    if (isRemoved) {
      setIsShowLoading(true);
      removeProduct(id, {
        onSuccess: () => {
          refetch();
          setIsShowLoading(false);
          toast.warning('🚀 Product Deleted!!');
        },
        onError: ({ data }) => {
          setIsShowLoading(false);
          toast.error(data.message);
        },
      });
    }
  }, []);

  if (!session) router.push('/');
  if (isLoading) return <Loading square />;

  return (
    <div className="p-product-info-list">
      <ProductsList
        products={data?.products}
        totalProducts={data?.productsCount}
        activePage={pageNumber}
        handlePagination={handlePagination}
        handleRemove={handleRemove}
      />
      {isModalOpen && (
        <Modal message="Do you want to remove this item?" onClick={handleModal} removeProductId={removeProductId} />
      )}
      {isShowLoading && <Loading overlay />}
    </div>
  );
};

export default ProductListPage;
