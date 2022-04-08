import nc from 'next-connect';
import dbConnect from '../../../../../Backend/config/dbConfig';

import { resetPassword } from '../../../../../Backend/controllers/authController';

import onError from '../../../../../Backend/middlewares/errors';

const handler = nc({ onError });

dbConnect();

handler.put(resetPassword);

export default handler;
