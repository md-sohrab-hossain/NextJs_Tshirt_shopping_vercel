import { buffer } from 'micro';
import mongoose from 'mongoose';
import absoluteUrl from 'next-absolute-url';
import catchAsyncErrors from '../middlewares/catchAsyncError';
import { ProductOrder } from '../models/productOrder';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

//Todo: Generate stripe checkout session   =>   /api/payment
export const stripCheckoutSession = catchAsyncErrors(async (req, res) => {
  const { origin } = absoluteUrl(req);

  const { priceTotal, orderImg } = req.query;

  //* Create stripe checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${origin}/customPages/shopping`,
    cancel_url: `${origin}/customPages/shopping`,
    customer_email: req.user.email,
    client_reference_id: req.user._id,
    mode: 'payment',
    line_items: [
      {
        name: 'Tshirt',
        images: [`${orderImg}`],
        amount: Number(priceTotal) * 100,
        currency: 'bdt',
        quantity: 1,
      },
    ],
  });

  res.status(200).json(session);
});

//Todo: update product order after payment   =>   /api/payment/webhook
export const webhookCheckout = catchAsyncErrors(async (req, res) => {
  const buf = await buffer(req);
  const signature = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  try {
    const event = stripe.webhooks.constructEvent(buf, signature, webhookSecret);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;

      const paymentInfo = {
        id: session.payment_intent,
        status: session.payment_status,
      };

      await ProductOrder.updateMany(
        {
          user: { $eq: mongoose.Types.ObjectId(session.client_reference_id) },
          'paymentInfo.status': { $ne: 'paid' },
        },
        {
          $set: {
            paymentInfo: paymentInfo,
            paidAt: Date.now(),
          },
        },
        { upsert: true }
      );

      res.status(200).json({ success: true });
    }
  } catch (error) {
    console.log('Error in Stripe Checkout Payment => ', error);
    res.status(401).json(error);
  }
});
