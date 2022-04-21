import dbConnect from 'Backend/config/dbConfig';
import { getAllProducts } from 'Backend/controllers/productController';
import onError from 'Backend/middlewares/errors';
import nc from 'next-connect';

//?---------------------👇 here we add onError middleware
const handler = nc({ onError });
dbConnect();

handler.get(getAllProducts);

export default handler;
