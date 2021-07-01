import mongoose, { model, Schema } from "mongoose";

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please enter product name"],
    unique: true,
    trim: true,
    maxLength: [100, "Product name can't exceed 100 characters"],
  },
  price: {
    type: Number,
    required: [true, "Please enter tshirt price"],
    maxLength: [4, "Tshirt price can't exceed 4 characters!"],
    default: 0.0,
  },
  description: {
    type: String,
    required: [true, "Please enter tshirt description"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: { type: String, required: true },
      url: { type: String, required: true },
    },
  ],
  reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export const Products =
  mongoose.models.Products || model("Products", productSchema);
