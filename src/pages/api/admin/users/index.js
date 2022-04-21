import dbConnect from 'Backend/config/dbConfig';
import { allAdminUsers } from 'Backend/controllers/authController';
import { authorizeRoles, isAuthenticatedUser } from 'Backend/middlewares/auth';
import onError from 'Backend/middlewares/errors';
import nc from 'next-connect';

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticatedUser, authorizeRoles('admin')).get(allAdminUsers);

export default handler;
