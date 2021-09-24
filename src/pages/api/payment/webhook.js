import nc from "next-connect";
import dbConnect from "../../../Backend/config/dbConfig";

import { webhookCheckout } from "../../../Backend/controllers/paymentController";

import onError from "../../../Backend/middlewares/errors";

const handler = nc({ onError });

dbConnect();

export const config = {
  api: {
    bodyParser: false,
  },
};

handler.post(webhookCheckout);

export default handler;
