import mongoose from "mongoose";
import cart from "../models/cartModel.js";

const viewCart = async (req, res) => {};

const addProductToCart = async (req, res) => {
  //Take the user ID
  const userId = req.user.userId;
  if (!userId) {
    res.status(404).json({ success: "failed", message: "User ID not found" });
  }
  //Take productId, quantity
  const { productId, quantity } = req.body;
  if (!productId || !quantity) {
    res.status(404).json({
      success: "failed",
      message: "product and quantity are required",
    });
  }
  //Find the product
  const product = await product.findOne({ productId: productId });
  if (!product) {
    res
      .status(404)
      .json({ success: "failed", message: "this product does not exist" });
  }
  //Get the product price
  const productPrice = product.price;
  //Calc Total price
  const totalPrice = productPrice * quantity;
  //check if cart exists
  const userCart = await cart.findOne({ user: userId });
  if (!userCart) {
    const newProduct = { productId, quantity, productPrice };
    const products = [newProduct];
    const newCart = new cart({
      userId: userId,
      products: products,
      totalPrice: totalPrice,
    });
    newCart.save();
  } else {
    const cart = userCart.findOne(productId);
    if (cart) {
      userCart.products.find();
    } else {
      userCart.products.add(product);
    }
    for (let i = 0; i < userCart.products.length(); i++) {}
  }
};
