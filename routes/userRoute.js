import express from 'express';
import {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
} from '../controllers/userController.js';
import verifyToken from '../middlewares/verifyToken.js';
import authorize from '../middlewares/authorize.js';


const router = express.Router()

router.get("/", verifyToken, authorize("admin"), getAllUsers)
router.get("/:id", verifyToken, authorize("admin"), getUserById)
router.patch("/:id", verifyToken, authorize("admin"), updateUser)
router.delete("/:id", verifyToken, authorize("admin"), deleteUser)

export default router;