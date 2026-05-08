import Product from "../models/productModel.js";
import Category from "../models/categoryModel.js";
import asyncWrapper from "../middlewares/asyncWrapper.js";
import httpStatus from "../utils/httpStatus.js";
import appError from "../utils/appError.js";

export const getAllProducts = asyncWrapper(async (req, res) => {
  const products = await Product.find().populate({
    path: "category",
    select: "-_id title",
    transform: (doc) => (doc ? doc.title : null),
  });
  res.status(200).json({ status: httpStatus.SUCCESS, data: { products } });
});

export const getProductById = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id).populate({
    path: "category",
    select: "-_id title",
    transform: (doc) => (doc ? doc.title : null),
  });

  if (!product) {
    return next(appError.create("Product not found", 404, httpStatus.ERROR));
  }

  res.status(200).json({ status: httpStatus.SUCCESS, data: { product } });
});

export const createProduct = asyncWrapper(async (req, res) => {
  const { name, description, price, discount, stock, category, images } =
    req.body;

  if (
    !name ||
    !description ||
    price === undefined ||
    stock === undefined ||
    !category
  ) {
    return next(
      appError.create(
        "Name, description, price, stock, and category are required fields",
        400,
        httpStatus.ERROR,
      ),
    );
  }

  const ctgory = await Category.findById(category);

  if (!ctgory) {
    return next(appError.create("Category not found", 404, httpStatus.ERROR));
  }

  const newProduct = await Product.create({
    name,
    description,
    price,
    discount,
    stock,
    category,
    images,
  });

  res.status(201).json({ status: httpStatus.SUCCESS, data: { newProduct } });
});

export const updateProduct = asyncWrapper(async (req, res) => {
  const { id } = req.params;

  const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
    returnDocument: "after",
  });

  if (!updatedProduct) {
    return next(appError.create("Product not found", 404, httpStatus.ERROR));
  }

  res
    .status(200)
    .json({ status: httpStatus.SUCCESS, data: { updatedProduct } });
});

export const deleteProduct = asyncWrapper(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    return next(appError.create("Product not found", 404, httpStatus.ERROR));
  }

  res.status(200).json({
    status: httpStatus.SUCCESS,
    message: "Product deleted successfully",
  });
});
