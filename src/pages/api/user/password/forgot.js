import dbConnect from 'Backend/config/dbConfig';
import { forgotPassword } from 'Backend/controllers/authController';
import onError from 'Backend/middlewares/errors';
import nc from 'next-connect';

const handler = nc({ onError });

dbConnect();

handler.post(forgotPassword);

export default handler;
