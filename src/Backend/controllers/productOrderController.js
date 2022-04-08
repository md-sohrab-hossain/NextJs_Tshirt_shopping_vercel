import { ProductOrder } from '../models/productOrder';

import ErrorHandler from '../utils/errorHandler';
import catchError from '../middlewares/catchAsyncError';
import mongoose from 'mongoose';

//! 👇 ------- order new Product -----------//
export const newProductOrder = catchError(async (req, res) => {
  const { product, quantity, price, paymentInfo, images } = req.body;

  await ProductOrder.updateOne(
    { product: product },
    {
      $inc: { quantity: quantity },
      $set: { price, paymentInfo, images, user: req.user._id },
    },
    { upsert: true }
  );

  res.status(200).json({
    success: true,
    message: 'Product update Successfully!',
  });
});

//!👇 -------------- remove item => /api/productOrder/myOrder/:id ---------------------//
export const removeItems = catchError(async (req, res, next) => {
  const product = await ProductOrder.findOne({ product: req.query.id });

  if (!product) {
    return next(new ErrorHandler('Product not found with this ID', 404));
  }

  await product.remove();

  res.status(200).json({
    success: true,
    message: 'item is removed!',
  });
});

//!👇 Get all orders of current user   =>   /api/productOrder/myOrder
export const myOrders = catchError(async (req, res) => {
  //*---------- process 1-----------//
  // const orders = await ProductOrder.find({ user: req.user._id }).populate({
  //   path: "user",
  //   select: "name email",
  // });
  //*---------- process 1-----------//

  //*---------- process 2-----------//
  const orders = await ProductOrder.aggregate([
    {
      $match: {
        user: { $eq: mongoose.Types.ObjectId(req.user._id) }, // this match is check user==id
        'paymentInfo.status': { $ne: 'paid' }, // this match is check paymentInfo.status!==paid
      },
    },
    {
      $lookup: {
        from: 'products',
        localField: 'product', // ai product er sob data nicci
        foreignField: '_id',
        as: 'productInfo',
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'user', // ai product j user korce tar info nicci
        foreignField: '_id',
        as: 'userInfo',
      },
    },
    {
      $group: {
        _id: '$product',
        totalPrice: { $sum: { $multiply: ['$price', '$quantity'] } }, // ai khane group by product korci r sob gula same type er product er price sum korci
        doc: { $first: '$$ROOT' },
      },
    },
    {
      // ai step a ese group r lookup er data er shate object er data merge kore dici
      $replaceRoot: {
        newRoot: {
          $mergeObjects: [{ count: '$count' }, { totalPrice: '$totalPrice' }, '$doc'],
        },
      },
    },
    {
      $sort: { createdAt: 1 },
    },
  ]);
  //*---------- process 2-----------//

  res.status(200).json({
    success: true,
    orders,
  });
});
