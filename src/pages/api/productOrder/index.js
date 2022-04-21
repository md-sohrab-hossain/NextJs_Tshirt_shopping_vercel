import dbConnect from 'Backend/config/dbConfig';
import { newProductOrder } from 'Backend/controllers/productOrderController';
import { isAuthenticatedUser } from 'Backend/middlewares/auth';
import onError from 'Backend/middlewares/errors';
import nc from 'next-connect';

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticatedUser).post(newProductOrder);

export default handler;
