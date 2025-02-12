//!👇 here we customize our page default behaviour
import * as Sentry from '@sentry/react';
import Loading from 'components/atoms/loading';
import GlobalError from 'components/templates/global-error';
import Layout from 'components/templates/layout';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import 'styles/index.scss';

const queryClient = new QueryClient();
function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [isRoutesChange, setIsRoutesChange] = useState(() => false);

  useEffect(() => {
    const handleRouteChangeStart = () => setIsRoutesChange(true);
    const handleRouteChangeError = () => setIsRoutesChange(false);
    const handleRouteChangeComplete = () => setIsRoutesChange(false);

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeError', handleRouteChangeError);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeError', handleRouteChangeError);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Sentry.ErrorBoundary fallback={({ error, resetError }) => <GlobalError error={error} onReset={resetError} />}>
        <Layout>
          <Component {...pageProps} />
          {isRoutesChange && <Loading overlay />}
        </Layout>
      </Sentry.ErrorBoundary>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  return { pageProps };
};

export default MyApp;
