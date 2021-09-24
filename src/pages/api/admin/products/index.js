import nc from "next-connect";
import dbConnect from "../../../../Backend/config/dbConfig";

import onError from "../../../../Backend/middlewares/errors";
import {
  isAuthenticatedUser,
  authorizeRoles,
} from "../../../../Backend/middlewares/auth";

import {
  createNewProduct,
  getAllProductsAdmin,
} from "../../../../Backend/controllers/productController";

const handler = nc({ onError });

dbConnect();

handler.get(getAllProductsAdmin);

// handler
//   .use(isAuthenticatedUser, authorizeRoles("admin"))
//   .get(getAllProductsAdmin);

handler
  .use(isAuthenticatedUser, authorizeRoles("admin"))
  .post(createNewProduct);

export default handler;
