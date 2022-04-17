import dbConnect from 'Backend/config/dbConfig';
import { updateProfile } from 'Backend/controllers/authController';
import { isAuthenticatedUser } from 'Backend/middlewares/auth';
import onError from 'Backend/middlewares/errors';
import nc from 'next-connect';

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticatedUser).put(updateProfile);

export default handler;
