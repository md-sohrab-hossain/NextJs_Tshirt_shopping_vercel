import Footer from 'components/atoms/footer';
import Navbar from 'components/organisms/navbar';
import { ROUTES } from 'constants/routes';
import { signOut } from 'next-auth/client';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getMyOrders } from 'redux/actions/productOrderAction';
import { loadUser } from 'redux/actions/userAction';

const Layout = ({ children, title = 'Tshirt shopping' }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { LOGIN, MY_ORDERS } = ROUTES;

  const { user, loading } = useSelector(state => state.loadedUser);
  const { isUpdated } = useSelector(state => state.user);

  const { order } = useSelector(state => state.getMyOrderList);
  const { success } = useSelector(state => state.productOrder);

  useEffect(() => {
    if (!isUpdated) {
      dispatch(loadUser());
    }
  }, [dispatch, isUpdated]);

  const getRecentOrder = useCallback(() => {
    dispatch(getMyOrders());
  }, [success]);

  useEffect(async () => {
    getRecentOrder();
  }, [success]);

  const handleLogin = () => {
    router.push(LOGIN);
  };

  const handleLogout = () => {
    signOut({ redirect: true, callbackUrl: '/' });
  };

  const handleCheckout = () => {
    if (!order?.orders.length) {
      return toast.warning('Your cart is empty!');
    }
    router.push(MY_ORDERS);
  };

  return (
    <div className="t-layout">
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
      </Head>

      <Navbar
        products={order}
        user={user}
        loading={loading}
        handleCheckout={handleCheckout}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
      />

      <ToastContainer position="bottom-right" />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
