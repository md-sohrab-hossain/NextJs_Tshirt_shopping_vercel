import { useGetOrderList } from 'api/useGetOrderList';
import { useGetUserDetails } from 'api/useGetUserDetails';
import Footer from 'components/atoms/footer';
import Navbar from 'components/organisms/navbar';
import { ROUTES } from 'constants/routes';
import { useGetAbsoluteUrl } from 'libs/utils';
import { signOut } from 'next-auth/client';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({ children, title = 'Tshirt shopping' }) => {
  const router = useRouter();
  const { LOGIN, MY_ORDERS } = ROUTES;

  const absoluteUrl = useGetAbsoluteUrl();
  const { data: userDetails, refetch: refetchUserInfo } = useGetUserDetails();
  const { data: orderList, refetch: refetchOrderList } = useGetOrderList(absoluteUrl);

  useEffect(() => {
    !userDetails?.user && refetchUserInfo();
    userDetails?.user && refetchOrderList();
  }, [userDetails]);

  const handleLogin = () => router.push(LOGIN);
  const handleLogout = () => signOut({ redirect: true, callbackUrl: '/' });

  const handleCheckout = () => {
    if (!orderList?.orders.length) return toast.warning('Your cart is empty!');
    router.push(MY_ORDERS);
  };

  return (
    <div className="t-layout">
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
      </Head>

      <Navbar
        products={orderList}
        user={userDetails?.user}
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
