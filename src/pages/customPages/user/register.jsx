import React from 'react';
import Register from '../../../components/auth/Register';

import { getSession } from 'next-auth/client';

export default function RegisterPage() {
  return <Register />;
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
