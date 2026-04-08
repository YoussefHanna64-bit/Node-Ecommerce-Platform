import mongoose from "mongoose";
import cart from "../models/cartModel.js";
import appError from "../utils/appError.js";
import httpStatus from "../utils/httpStatus.js";
import Product from "../models/productModel.js";

export const viewCart = async (req, res, next) => {
  const userId = req.user.id;
  if (!userId) {
    const error = appError.create("Unauthorized user", 401, httpStatus.ERROR);
    return next(error);
  }

  const existCart = await cart
    .findOne({ userId })
    .populate("userId", "firstName -_id")
    .populate("products.productId");

  if (!existCart) {
    return res.status(200).json({
      success: httpStatus.SUCCESS,
      cartItems: [],
      totalPrice: 0,
    });
  }

  res.status(200).json({
    success: httpStatus.SUCCESS,
    userName: existCart.userId.firstName,
    cartItems: existCart.products,
    totalPrice: existCart.totalPrice,
  });
};

export const addProductToCart = async (req, res, next) => {
  const userId = req.user.id;
  if (!userId) {
    const error = appError.create(
      "ID is missing. Login to add items to your cart",
      401,
      httpStatus.ERROR,
    );
    return next(error);
  }

  const { productId, quantity = 1 } = req.body;
  if (!productId) {
    const error = appError.create(
      "product ID is required",
      400,
      httpStatus.FAIL,
    );
    return next(error);
  }

  const product = await Product.findById(productId, { price: 1, stock: 1 });
  if (!product) {
    const error = appError.create("product not found", 404, httpStatus.FAIL);
    return next(error);
  }

  if (product.stock < quantity) {
    const error = appError.create(
      "Not enough stock available",
      400,
      httpStatus.FAIL,
    );
    return next(error);
  }
  const price = product.price;
  const existCart = await cart.findOne({ userId });

  if (!existCart) {
    const newCart = await cart.create({
      userId,
      products: [{ productId, quantity, price }],
      totalPrice: price * quantity,
    });
    return res.status(201).json({
      success: httpStatus.SUCCESS,
      cart: newCart,
    });
  } else {
    const existingProductIndex = existCart.products.findIndex(
      (product) => product.productId.toString() === productId,
    );
    if (existingProductIndex === -1) {
      existCart.products.push({
        productId,
        quantity,
        price,
      });
    } else {
      existCart.products[existingProductIndex].quantity += quantity;
    }

    existCart.totalPrice += price * quantity;
    await existCart.save();
    return res.status(200).json({
      success: httpStatus.SUCCESS,
      cart: existCart,
    });
  }
};

export const removeProductFromCart = async (req, res, next) => {
  const userId = req.user.id;
  if (!userId) {
    const error = appError.create("Unauthorized user", 401, httpStatus.ERROR);
    return next(error);
  }

  const { productId } = req.body;
  if (!productId) {
    const error = appError.create(
      "product ID is required",
      400,
      httpStatus.FAIL,
    );
    return next(error);
  }

  const existCart = await cart.findOne({ userId });

  if (!existCart) {
    const error = appError.create(
      "cart is already empty",
      400,
      httpStatus.FAIL,
    );
    return next(error);
  }

  const productIndex = existCart.products.findIndex(
    (product) => product.productId.toString() === productId,
  );
  if (productIndex === -1) {
    const error = appError.create(
      "This product is not in the cart",
      400,
      httpStatus.FAIL,
    );
    return next(error);
  }
  existCart.totalPrice -=
    existCart.products[productIndex].quantity *
    existCart.products[productIndex].price;

  existCart.products.splice(productIndex, 1);

  await existCart.save();
  res.status(200).json({
    success: httpStatus.SUCCESS,
    message: "product removed successfully",
    currentCart: existCart.products,
  });
};

export const clearCart = async (req, res, next) => {
  const userId = req.user.id;
  if (!userId) {
    const error = appError.create("Unauthorized user", 401, httpStatus.ERROR);
    return next(error);
  }

  const existCart = await cart.findOne({ userId });
  if (!existCart) {
    const error = appError.create(
      "cart is already empty",
      400,
      httpStatus.FAIL,
    );
    return next(error);
  }

  existCart.products = [];
  existCart.totalPrice = 0;

  await existCart.save();
  res.status(200).json({
    success: httpStatus.SUCCESS,
    message: "cart cleared successfully",
  });
};
