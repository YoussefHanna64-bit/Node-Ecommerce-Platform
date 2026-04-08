import express from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import verifyToken from "../middlewares/verifyToken.js";
import authorize from "../middlewares/authorize.js";

const router = express.Router();

router.get("/", verifyToken, getAllProducts);
router.get("/:id", verifyToken, getProductById);
router.post("/", verifyToken, authorize("admin"), createProduct);
router.patch("/:id", verifyToken, authorize("admin"), updateProduct);
router.delete("/:id", verifyToken, authorize("admin"), deleteProduct);

export default router;
