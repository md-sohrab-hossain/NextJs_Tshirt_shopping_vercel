import React from 'react';
import { getSession } from 'next-auth/client';
import Profile from '../../../../components/user/Profile';
const userProfilePage = () => {
  return <Profile />;
};

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: '/customPages/user/login',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default userProfilePage;
