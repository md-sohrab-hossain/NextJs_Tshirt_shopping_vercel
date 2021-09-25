import React from "react";
import { getSession } from "next-auth/client";

import AllUsers from "../../../../components/admin/AllUsers";

const AdminUserPage = () => {
  return <AllUsers />;
};

AdminUserPage.getInitialProps = async ({ req, res }) => {
  const session = await getSession({ req: req });

  if (!session || session.user.role !== "admin") {
    res.writeHead(301, {
      Location: "/",
    });
    res.end();
  }

  return {
    props: {},
  };
};

export default AdminUserPage;
