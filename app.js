import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/dbConfig.js";
import categoryRoute from "./routes/categoryRoute.js";
import productRoute from "./routes/productRoute.js";
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import httpStatus from "./utils/httpStatus.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

dotenv.config();
connectDB();
const app = express();

app.use(express.json());
app.use("/category", categoryRoute);
app.use("/products", productRoute);
app.use("/authentication", authRoute);
app.use("/user", userRoute);
app.use("/cart", cartRouter);
app.use("/order", orderRouter);

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
