import dbConnect from 'Backend/config/dbConfig';
import { removeItems } from 'Backend/controllers/productOrderController';
import { isAuthenticatedUser } from 'Backend/middlewares/auth';
import onError from 'Backend/middlewares/errors';
import nc from 'next-connect';

//?---------------------👇 here we add onError middleware
const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticatedUser).delete(removeItems);

export default handler;
