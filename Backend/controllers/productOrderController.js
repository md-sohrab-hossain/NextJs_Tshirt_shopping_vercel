import { ProductOrder } from "../models/productOrder";

// import ErrorHandler from "../utils/errorHandler";
import catchError from "../middlewares/catchAsyncError";
import mongoose from "mongoose";

//! 👇 order new Product
export const newProductOrder = catchError(async (req, res) => {
  const { product, quantity, price, paymentInfo, images } = req.body;

  const order = await ProductOrder.create({
    product,
    user: req.user._id,
    quantity,
    price,
    paymentInfo,
    images,
    paidAt: Date.now(),
  });

  res.status(200).json({
    success: true,
    order,
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
      $match: { user: { $eq: mongoose.Types.ObjectId(req.user._id) } }, // this match is check user==id
    },
    {
      $lookup: {
        from: "products",
        localField: "product",
        foreignField: "_id",
        as: "productInfo",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "userInfo",
      },
    },
    {
      $group: {
        _id: "$product",
        totalPrice: { $sum: "$price" }, // ai khane group by product korci r sob gula same type er product er price sum korci
        count: { $sum: 1 },
        doc: { $first: "$$ROOT" },
      },
    },
    {
      // ai step a ese group r lookup er data er shate object er data merge kore dici
      $replaceRoot: {
        newRoot: {
          $mergeObjects: [
            { count: "$count" },
            { totalPrice: "$totalPrice" },
            "$doc",
          ],
        },
      },
    },
  ]);
  //*---------- process 2-----------//

  res.status(200).json({
    success: true,
    orders,
  });
});
