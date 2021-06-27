import nc from "next-connect";
import dbConnect from "../../../../Backend/config/dbConfig";

import { updateProfile } from "../../../../Backend/controllers/authController";

import { isAuthenticatedUser } from "../../../../Backend/middlewares/auth";
import onError from "../../../../Backend/middlewares/errors";

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticatedUser).put(updateProfile);

export default handler;
