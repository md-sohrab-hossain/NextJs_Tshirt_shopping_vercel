import dbConnect from 'Backend/config/dbConfig';
import { deleteProduct, getSingleProduct, updateProductInfo } from 'Backend/controllers/productController';
import { authorizeRoles, isAuthenticatedUser } from 'Backend/middlewares/auth';
import onError from 'Backend/middlewares/errors';
import nc from 'next-connect';

//?---------------------👇 here we add onError middleware
const handler = nc({ onError });

dbConnect();

handler.get(getSingleProduct);
handler.use(isAuthenticatedUser, authorizeRoles('admin')).put(updateProductInfo);

handler.use(isAuthenticatedUser, authorizeRoles('admin')).delete(deleteProduct);

export default handler;
