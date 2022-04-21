import dbConnect from 'Backend/config/dbConfig';
import { stripCheckoutSession } from 'Backend/controllers/paymentController';
import { isAuthenticatedUser } from 'Backend/middlewares/auth';
import onError from 'Backend/middlewares/errors';
import nc from 'next-connect';

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticatedUser).get(stripCheckoutSession);

export default handler;
