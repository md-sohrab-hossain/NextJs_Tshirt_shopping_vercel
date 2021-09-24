import nc from "next-connect";
import dbConnect from "../../../../Backend/config/dbConfig";
import { registerUser } from "../../../../Backend/controllers/authController";
import onError from "../../../../Backend/middlewares/errors";

//?---------------------👇 here we add onError middleware
const handler = nc({ onError });
dbConnect();

handler.post(registerUser);

export default handler;
