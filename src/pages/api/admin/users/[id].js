import nc from 'next-connect';
import dbConnect from '../../../../Backend/config/dbConfig';
import onError from '../../../../Backend/middlewares/errors';

import { getUserDetails, updateUser, deleteUser } from '../../../../Backend/controllers/authController';

import { isAuthenticatedUser, authorizeRoles } from '../../../../Backend/middlewares/auth';

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticatedUser, authorizeRoles('admin')).get(getUserDetails);

handler.use(isAuthenticatedUser, authorizeRoles('admin')).put(updateUser);

handler.use(isAuthenticatedUser, authorizeRoles('admin')).delete(deleteUser);

export default handler;
