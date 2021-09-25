import React from "react";
import { getSession } from "next-auth/client";

import UpdateUser from "../../../../components/admin/updateUser";

const UpdateUserPage = () => {
  return <UpdateUser />;
};

export async function getServerSideProps({ req, res }) {
  const session = await getSession({ req: req });

  if (!session || session?.user.role !== "admin") {
    res.writeHead(301, {
      Location: "/",
    });
    res.end();
  }

  return {
    props: {},
  };
}

export default UpdateUserPage;
