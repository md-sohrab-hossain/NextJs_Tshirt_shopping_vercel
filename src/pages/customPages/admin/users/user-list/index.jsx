import Loading from 'components/atoms/loading/index';
import Modal from 'components/molecules/modal';
import UsersList from 'components/organisms/users-list';
import { ROUTES } from 'constants/routes';
import { getSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { clearErrors, deleteUser, getAdminUsers } from 'redux/actions/userAction';
import { DELETE_USER_RESET } from 'redux/types/userTypes';

const UserListPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [removeProduct, setRemoveProduct] = useState(null);

  const { loading, error, users } = useSelector(state => state.allUsers);
  const { error: deleteError, isDeleted } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(getAdminUsers());

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success('User Deleted Successfully!');
      router.push(`${ROUTES.ADMIN_USERS}`);
      dispatch({ type: DELETE_USER_RESET });
    }
  }, [dispatch, error, deleteError, isDeleted]);

  const handleRemove = useCallback(id => {
    setRemoveProduct(id);
    setIsModalOpen(true);
  }, []);

  const handleModal = useCallback((isRemoved, id) => {
    setIsModalOpen(false);
    isRemoved && dispatch(deleteUser(id));
  }, []);

  if (loading) return <Loading square />;

  return (
    <div className="p-users-list">
      <UsersList users={users} totalUsers={users?.length} handleRemove={handleRemove} />
      {isModalOpen && (
        <Modal message="Do you want to remove this item?" onClick={handleModal} removeProductId={removeProduct} />
      )}
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
