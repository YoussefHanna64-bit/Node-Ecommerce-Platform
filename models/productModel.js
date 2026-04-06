import mongoose from "mongoose";

const { Schema } = mongoose;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "Product name must be at least 3 characters long"],
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: [4, "Product description must be at least 4 characters long"],
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price must be a positive number"],
    },
    discount: {
      type: Number,
      min: [0, "Discount must be a positive number"],
      max: [100, "Discount can't exceed 100%"],
      default: 0,
    },
    stock: {
      type: Number,
      required: true,
      min: [0, "Stock must be a positive number"],
    },
    rating: {
      rate: {
        type: Number,
        min: [0, "Rating must be a positive number"],
        max: [5, "Rating can't exceed 5"],
        default: 0,
      },
      count: {
        type: Number,
        default: 0,
        min: 0,
      },
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    images: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

const Product = mongoose.model("Product", productSchema);

export default Product;
