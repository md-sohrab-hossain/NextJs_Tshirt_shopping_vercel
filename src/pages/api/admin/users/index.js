import nc from "next-connect";
import dbConnect from "../../../../Backend/config/dbConfig";
import onError from "../../../../Backend/middlewares/errors";
import { allAdminUsers } from "../../../../Backend/controllers/authController";

import {
  isAuthenticatedUser,
  authorizeRoles,
} from "../../../../Backend/middlewares/auth";

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticatedUser, authorizeRoles("admin")).get(allAdminUsers);

export default handler;
