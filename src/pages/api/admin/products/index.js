import dbConnect from 'Backend/config/dbConfig';
import { createNewProduct, getAllProductsAdmin } from 'Backend/controllers/productController';
import { authorizeRoles, isAuthenticatedUser } from 'Backend/middlewares/auth';
import onError from 'Backend/middlewares/errors';
import nc from 'next-connect';

const handler = nc({ onError });

dbConnect();

handler.get(getAllProductsAdmin);

// handler
//   .use(isAuthenticatedUser, authorizeRoles("admin"))
//   .get(getAllProductsAdmin);

handler.use(isAuthenticatedUser, authorizeRoles('admin')).post(createNewProduct);

export default handler;
