import { useDeleteUser } from 'api/useDeleteUser';
import { useGetUsersList } from 'api/useGetUsersList';
import Loading from 'components/atoms/loading';
import Modal from 'components/molecules/modal';
import UsersList from 'components/organisms/users-list';
import { getSession } from 'next-auth/client';
import React, { useCallback, useState } from 'react';
import { toast } from 'react-toastify';

const UserListPage = () => {
  const [isDeleted, setIsDeleted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [removeProduct, setRemoveProduct] = useState(null);

  const { data: usersList, isLoading, refetch } = useGetUsersList();
  const { mutate: removeUser } = useDeleteUser();

  const handleRemove = useCallback(id => {
    setRemoveProduct(id);
    setIsModalOpen(true);
  }, []);

  const handleModal = useCallback((isRemoved, id) => {
    setIsModalOpen(false);
    if (isRemoved) {
      setIsDeleted(true);

      removeUser(id, {
        onSuccess: () => {
          refetch();
          setIsDeleted(false);
          toast.success('User Deleted Successfully!');
        },
        onError: () => {
          setIsDeleted(false);
          toast.error('Something went wrong!!');
        },
      });
    }
  }, []);

  if (isLoading) return <Loading square />;

  return (
    <div className="p-users-list">
      <UsersList users={usersList?.users} handleRemove={handleRemove} />
      {isModalOpen && (
        <Modal message="Do you want to remove this item?" onClick={handleModal} removeProductId={removeProduct} />
      )}
      {isDeleted && <Loading overlay />}
    </div>
  );
};

UserListPage.getInitialProps = async ({ req, res }) => {
  const session = await getSession({ req: req });

  if (!session || session.user.role !== 'admin') {
    res.writeHead(301, {
      Location: '/',
    });
    res.end();
  }

  return {
    props: {},
  };
};

export default UserListPage;
