import nc from "next-connect";
import dbConnect from "../../../../Backend/config/dbConfig";
import { removeItems } from "../../../../Backend/controllers/productOrderController";
import onError from "../../../../Backend/middlewares/errors";

//?---------------------👇 here we add onError middleware
const handler = nc({ onError });
import { isAuthenticatedUser } from "../../../../Backend/middlewares/auth";

dbConnect();

handler.use(isAuthenticatedUser).delete(removeItems);

export default handler;
