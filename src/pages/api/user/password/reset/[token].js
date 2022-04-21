import dbConnect from 'Backend/config/dbConfig';
import { resetPassword } from 'Backend/controllers/authController';
import onError from 'Backend/middlewares/errors';
import nc from 'next-connect';

const handler = nc({ onError });

dbConnect();

handler.put(resetPassword);

export default handler;
