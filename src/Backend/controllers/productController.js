import { Products } from "../models/product";
import ErrorHandler from "../utils/errorHandler";
import catchError from "../middlewares/catchAsyncError";
import ApiFeatures from "../utils/apiFeature";

import cloudinary from "cloudinary";

//TODO: --------------- Create new product => /api/products ---------------------//
export const createNewProduct = catchError(async (req, res) => {
  const images = req.body.images;

  let imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "tshirt/products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.user = req.body.user._id;

  const products = await Products.create(req.body);

  res.status(200).json({
    success: true,
    products,
  });
});
//*-------------------------------❌❌❌--------------------------------- */

//TODO:----------------------- get all products /api/products ---------------------------//
export const getAllProducts = catchError(async (req, res) => {
  const resultPerPage = 8;
  const productsCount = await Products.countDocuments();

  const apiFeatures = new ApiFeatures(Products.find(), req.query).filter();

  let products = await apiFeatures.query;
  let filteredProductCount = products.length;

  apiFeatures.pagination(resultPerPage);
  products = await apiFeatures.query;

  res.status(200).json({
    success: true,
    productsCount,
    resultPerPage,
    filteredProductCount,
    products,
  });
});
//*------------------------------❌❌❌--------------------------------- */

//TODO: ---------- Get all products - ADMIN   =>   /api/admin/products -----------------//
export const getAllProductsAdmin = catchError(async (req, res) => {
  const resultPerPage = 4;
  const productsCount = await Products.countDocuments();

  const apiFeatures = new ApiFeatures(Products.find(), req.query).filter();

  let products = await apiFeatures.query;
  let filteredProductCount = products.length;

  apiFeatures.pagination(resultPerPage);
  products = await apiFeatures.query;

  res.status(200).json({
    success: true,
    productsCount,
    resultPerPage,
    filteredProductCount,
    products,
  });
});
//*----------------------------------❌❌❌--------------------------------------------- */

//TODO: -------------- get product details => /api/user/products/:id ---------------//
export const getSingleProduct = catchError(async (req, res, next) => {
  const product = await Products.findById(req.query.id);
  if (!product) {
    return next(new ErrorHandler("Product not found with this id!", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});
//*--------------------------------❌❌❌---------------------------------- */

//TODO: ------------ update product => /api/user/products/:id ---------------//
export const updateProductInfo = catchError(async (req, res, next) => {
  let product = await Products.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Product not found with this ID", 404));
  }

  if (req.body.images?.length > 0) {
    // Delete images associated with the product
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    let imagesLinks = [];
    const images = req.body.images;

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "tshirt/products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  } else {
    req.body.images = product.images;
  }

  product = await Products.findByIdAndUpdate(req.query.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});
//*---------------------------------❌❌❌--------------------------------- */

//TODO: -------------- Delete product => /api/user/products/:Id ---------------------//
export const deleteProduct = catchError(async (req, res, next) => {
  const product = await Products.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Product not found with this ID", 404));
  }

  // Delete images associated with the room
  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  }

  await product.remove();

  res.status(200).json({
    success: true,
    message: "Product is deleted.",
  });
});
//*---------------------------------❌❌❌----------------------------------- */
