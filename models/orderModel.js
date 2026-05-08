import mongoose, { Schema } from "mongoose";
const paymentEnum = ["cash", "card", "paypal"];
const orderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    cartId: {
      type: Schema.Types.ObjectId,
      ref: "cart",
      required: true,
    },
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: [1, "quantity must be at least 1"],
        },
        price: {
          type: Number,
          required: true,
        },
        images: {
          type: [String],
          default: [],
        },
      },
    ],
    address: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: paymentEnum,
      default: "cash",
    },
  },
  { timestamps: true },
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
