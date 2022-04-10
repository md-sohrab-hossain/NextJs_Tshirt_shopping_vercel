import Head from 'next/head';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './Footer';
import Header from './Header';

const Layout = ({ children, title = 'Tshirt shopping' }) => {
  return (
    <div style={{ height: '100%' }}>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
      </Head>

      <Header />
      <ToastContainer position="bottom-right" />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
