//!👇 here we customize our page default behaviour
import Loading from 'components/atoms/loading/index';
import Layout from 'components/templates/layout';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { initStore, wrapper } from 'redux/store';
import 'styles/index.scss';

const store = initStore();
function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [isRoutesChange, setIsRoutesChange] = useState(() => false);

  useEffect(() => {
    const handleRouteChange = () => setIsRoutesChange(false);
    const handleChangeStart = () => setIsRoutesChange(true);

    router.events.on('routeChangeComplete', handleRouteChange);
    router.events.on('routeChangeStart', handleChangeStart);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
      router.events.off('routeChangeStart', handleChangeStart);
    };
  }, []);

  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
        {isRoutesChange && <Loading overlay />}
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
