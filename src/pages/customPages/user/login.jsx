import React from 'react';
import Login from '../../../components/auth/login';
import { getSession } from 'next-auth/client';

function LoginPage() {
  return <Login />;
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default LoginPage;
