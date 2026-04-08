import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import {
  addProductToCart,
  viewCart,
  clearCart,
  removeProductFromCart,
} from "../controllers/cartController.js";

const router = express.Router();

router.post("/", verifyToken, addProductToCart);
router.get("/", verifyToken, viewCart);
router.delete("/", verifyToken, clearCart);
router.patch("/", verifyToken, removeProductFromCart);

export default router;
