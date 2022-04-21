import dbConnect from 'Backend/config/dbConfig';
import { myOrders } from 'Backend/controllers/productOrderController';
import { isAuthenticatedUser } from 'Backend/middlewares/auth';
import onError from 'Backend/middlewares/errors';
import nc from 'next-connect';

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticatedUser).get(myOrders);

export default handler;
