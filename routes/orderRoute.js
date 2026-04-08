import * as orderController from "../controllers/orderController.js";
import verifyToken from "../middlewares/verifyToken.js";
import authorize from "../middlewares/authorize.js";
import express from "express";
const router = express.Router();

//Add Order
router.post("/", verifyToken, orderController.addOrder);

//Get All Orders
router.get("/", verifyToken, authorize("admin"), orderController.getAllOrders);

//Get Order By ID
router.get("/:id", verifyToken, orderController.getOrderById);

// Get Orders for a User
router.get("/user/:userid", verifyToken, orderController.getOrdersByUser);

//Delete Order
router.delete("/", verifyToken, orderController.deleteOrder);

export default router;
