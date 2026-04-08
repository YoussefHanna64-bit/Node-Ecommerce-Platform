import Category from "../models/categoryModel.js";
import asyncWrapper from "../middlewares/asyncWrapper.js";
import httpStatus from "../utils/httpStatus.js";
import appError from "../utils/appError.js";

export const addCategory = asyncWrapper(async (req, res, next) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return next(
      appError.create(
        "Title and description are required for category",
        404,
        httpStatus.ERROR,
      ),
    );
  }
  const category = await Category.create({
    title,
    description,
  });
  res.status(201).json({
    status: httpStatus.SUCCESS,
    data: {
      category,
    },
  });
});

export const getAllCategories = asyncWrapper(async (req, res) => {
  const categories = await Category.find();
  res.status(200).json({
    status: httpStatus.SUCCESS,
    data: {
      categories,
    },
  });
});

export const getCategoryById = asyncWrapper(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    return next(appError.create("Category not found", 404, httpStatus.ERROR));
  }
  res.status(200).json({
    status: httpStatus.SUCCESS,
    data: { category },
  });
});

export const updateCategory = asyncWrapper(async (req, res, next) => {
  const updatedCategory = await Category.findByIdAndUpdate(
    req.params.id,
    req.body,
    { returnDocument: "after" },
  );
  if (!updateCategory) {
    return next(appError.create("Category not found", 404, httpStatus.ERROR));
  }
  res.status(200).json({
    status: httpStatus.SUCCESS,
    data: { category: updatedCategory },
  });
});

export const deleteCategory = asyncWrapper(async (req, res, next) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category) {
    return next(appError.create("Category not found", 404, httpStatus.ERROR));
  }
  res.status(200).json({
    status: httpStatus.SUCCESS,
    data: null,
  });
});
