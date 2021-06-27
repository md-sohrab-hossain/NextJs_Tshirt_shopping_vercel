import React from "react";
import { getSession } from "next-auth/client";

import UpdateProduct from "../../../../components/admin/updateProduct";

const UpdateProductPage = () => {
  return <UpdateProduct />;
};

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session || session?.user.role !== "admin") {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default UpdateProductPage;
