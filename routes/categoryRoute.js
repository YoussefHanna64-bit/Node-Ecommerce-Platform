import express from "express";
import {
  addCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";
import verifyToken from "../middlewares/verifyToken.js";
import authorize from "../middlewares/authorize.js";

const router = express.Router();

router.get("/", verifyToken, getAllCategories);
router.get("/:id", verifyToken, getCategoryById);
router.post("/", verifyToken, authorize("admin"), addCategory);
router.patch("/:id", verifyToken, authorize("admin"), updateCategory);
router.delete("/:id", verifyToken, authorize("admin"), deleteCategory);

export default router;
