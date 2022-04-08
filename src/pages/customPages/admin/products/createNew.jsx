import React from 'react';
import { getSession } from 'next-auth/client';

import CreateNewProduct from '../../../../components/admin/CreateNewProduct';

const CreateNewProductPage = () => {
  return <CreateNewProduct />;
};

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session || session.user.role !== 'admin') {
    return {
      redirect: {
        destination: '/customPages/user/login',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default CreateNewProductPage;
