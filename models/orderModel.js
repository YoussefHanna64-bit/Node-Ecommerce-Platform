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
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
