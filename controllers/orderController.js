import Order from "../models/orderModel.js";
import cartModel from "../models/cartModel.js";
import httpStatus from "../utils/httpStatus.js";
import appError from "../utils/appError.js";

//Add Order
export const addOrder = async (req, res, next) => {
  const { userId, paymentMethod } = req.body;
  if (!userId) {
    const error = appError.create(
      "Missing required fields.",
      400,
      httpStatus.ERROR,
    );
    return next(error);
  }
  const cartExist = await cartModel.findOne({ userId });
  if (!cartExist) {
    const error = appError.create("Cart not found.", 404, httpStatus.ERROR);
    return next(error);
  }
  const subtotal = cartExist.products.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const totalPrice = Number((subtotal * 1.14).toFixed(2));

  const data = await Order.create({
    userId,
    cartId: cartExist._id,
    totalPrice,
    paymentMethod,
  });

  cartExist.products = [];
  cartExist.totalPrice = 0;
  await cartExist.save();

  return res.status(201).json({
    message: "Order created successfully",
    data,
  });
};

//Get All Orders
export const getAllOrders = async (req, res, next) => {
  const orders = await Order.find().populate({
    path: "cartId",
    select: "products",
    populate: {
      path: "products.productId",
      select: "name",
    },
  });
  if (!orders.length) {
    const error = appError.create("No Orders found.", 404, httpStatus.ERROR);
    return next(error);
  }
  return res.status(200).json({
    data: orders,
  });
};

//Get Order By ID
export const getOrderById = async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    const error = appError.create(
      "Order ID is required.",
      400,
      httpStatus.ERROR,
    );
    return next(error);
  }
  const orderExist = await Order.findById(id).populate({
    path: "cartId",
    select: "-_id products",
    populate: {
      path: "products.productId",
      select: "name",
    },
  });
  if (!orderExist) {
    const error = appError.create("Order not found.", 404, httpStatus.ERROR);
    return next(error);
  }
  return res.status(200).json({
    data: orderExist,
  });
};

//Get Orders for a User
export const getOrdersByUser = async (req, res, next) => {
  const { userid } = req.params;
  if (!userid) {
    const error = appError.create(
      "User ID is required.",
      400,
      httpStatus.ERROR,
    );
    return next(error);
  }
  const userOrders = await Order.find({ userId: userid }).populate({
    path: "cartId",
    select: "products",
    populate: {
      path: "products.productId",
      select: "name",
    },
  });
  if (!userOrders.length) {
    const error = appError.create(
      "No Orders found for this user",
      404,
      httpStatus.ERROR,
    );
    return next(error);
  }
  return res.status(200).json({
    data: userOrders,
  });
};

//Delete Order
export const deleteOrder = async (req, res, next) => {
  const { orderId } = req.body;
  if (!orderId) {
    const error = appError.create(
      "Order ID is required.",
      400,
      httpStatus.ERROR,
    );
    return next(error);
  }
  const orderExist = await Order.findById(orderId);
  if (!orderExist) {
    const error = appError.create("Order Not Found", 404, httpStatus.ERROR);
    return next(error);
  }
  await Order.findByIdAndDelete(orderId);
  return res.status(204).json({});
};
