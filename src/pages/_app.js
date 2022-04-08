import '../styles/globals.scss';
import React from 'react';

//!👇 here we customize our page default behaviour
import Layout from '../components/Layout/Layout';
import { initStore, wrapper } from '../redux/store';
import { Provider } from 'react-redux';

const store = initStore();
function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  return { pageProps };
};

export default wrapper.withRedux(MyApp);
