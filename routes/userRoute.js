import express from 'express';
import {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
} from '../controllers/userController.js';
import verifyToken from '../middlewares/verifyToken.js';

const router = express.Router()

router.get("/", verifyToken, getAllUsers)
router.get("/:id", verifyToken, getUserById)
router.patch("/:id", verifyToken, updateUser)
router.delete("/:id", verifyToken, deleteUser)

export default router;