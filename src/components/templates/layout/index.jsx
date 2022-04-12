import Footer from 'components/Layout/Footer';
import Navbar from 'components/organisms/navbar';
import Head from 'next/head';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getMyOrders } from 'redux/actions/productOrderAction';
import { loadUser } from 'redux/actions/userAction';

const Layout = ({ children, title = 'Tshirt shopping' }) => {
  const dispatch = useDispatch();

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

  return (
    <div className="t-layout">
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
      </Head>

      <Navbar products={order} user={user} loading={loading} />
      <ToastContainer position="bottom-right" />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
