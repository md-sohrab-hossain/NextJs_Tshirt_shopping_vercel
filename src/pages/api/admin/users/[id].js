import dbConnect from 'Backend/config/dbConfig';
import { deleteUser, getUserDetails, updateUser } from 'Backend/controllers/authController';
import { authorizeRoles, isAuthenticatedUser } from 'Backend/middlewares/auth';
import onError from 'Backend/middlewares/errors';
import nc from 'next-connect';

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticatedUser, authorizeRoles('admin')).get(getUserDetails);

handler.use(isAuthenticatedUser, authorizeRoles('admin')).put(updateUser);

handler.use(isAuthenticatedUser, authorizeRoles('admin')).delete(deleteUser);

export default handler;
