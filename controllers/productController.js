import Product from "../models/productModel.js";
// import Category from "../models/categoryModel.js"; 

export const getAllProducts = async (req, res) => {
  const products = await Product.find().populate("category", "-_id name");
  res.status(200).json({ success: true, data: products });
};

export const getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id).populate("category", "-_id name");

  if (!product) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }

  res.status(200).json({ success: true, data: product });
};

export const createProduct = async (req, res) => {
  const { name, description, price, discount, stock, category, images } = req.body;

  if (!name ||!description ||price === undefined ||stock === undefined ||!category) {
    return res.status(400).json({ success: false, message: "Name, description, price, stock, and category are required fields" });
  }

//   const ctgory = await Category.findById(category);

//   if (!ctgory) {
//     return res.status(404).json({ success: false, message: "Category not found" });
//   }

  const newProduct = await Product.create({
    name,
    description,
    price,
    discount,
    stock,
    category,
    images,
  });

  res.status(201).json({ success: true, data: newProduct });
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;

    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { returnDocument: "after" });

    if (!updatedProduct) {
        return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, data: updatedProduct });
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }

  res.status(200).json({ success: true, message: "Product deleted successfully" });
};

