import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./config/dbConfig.js";
import categoryRoute from "./routes/categoryRoute.js";
import productRoute from "./routes/productRoute.js";
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import httpStatus from "./utils/httpStatus.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import paymentRoute from "./routes/paymentRoute.js";
import cors from "cors";
import chatRoute from "./routes/chatRoute.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:4200",
  }),
);

connectDB();

app.use(express.json());
app.use("/api/category", categoryRoute);
app.use("/api/products", productRoute);
app.use("/api/authentication", authRoute);
app.use("/api/user", userRoute);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/payment", paymentRoute);
app.use("/api/chat", chatRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.use((req, res, next) => {
  return res.status(404).json({
    status: httpStatus.ERROR,
    message: "Route not found",
  });
});

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    status: err.status || httpStatus.ERROR,
    message: err.message || "Internal Server Error",
    code: err.statusCode,
  });
});

app.listen(process.env.PORT, () => {
  console.log("server is running");
});
