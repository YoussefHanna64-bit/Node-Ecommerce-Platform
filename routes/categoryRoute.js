import express from 'express';
import {
    addCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
} from '../controllers/categoryController.js';

const router = express.Router()

router.post("/", addCategory)
router.get("/", getAllCategories)
router.get("/:id", getCategoryById)
router.patch("/:id", updateCategory)
router.delete("/:id", deleteCategory)

export default router;