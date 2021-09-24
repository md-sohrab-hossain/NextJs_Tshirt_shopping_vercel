import nc from "next-connect";
import dbConnect from "../../../../Backend/config/dbConfig";
import {
  getSingleProduct,
  updateProductInfo,
  deleteProduct,
} from "../../../../Backend/controllers/productController";
import onError from "../../../../Backend/middlewares/errors";

//?---------------------👇 here we add onError middleware
const handler = nc({ onError });
import {
  isAuthenticatedUser,
  authorizeRoles,
} from "../../../../Backend/middlewares/auth";

dbConnect();

handler.get(getSingleProduct);
handler
  .use(isAuthenticatedUser, authorizeRoles("admin"))
  .put(updateProductInfo);

handler.use(isAuthenticatedUser, authorizeRoles("admin")).delete(deleteProduct);

export default handler;
