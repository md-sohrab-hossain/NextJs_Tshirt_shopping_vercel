//!👇 here we customize our page default behaviour
import Layout from 'components/Layout/Layout';
import React from 'react';
import { Provider } from 'react-redux';
import { initStore, wrapper } from 'redux/store';
import 'styles/index.scss';

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
