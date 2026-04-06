import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/dbConfig.js";
import categoryRoute from './routes/categoryRoute.js';
import productRoutes from "./routes/productRoute.js";

dotenv.config();
connectDB();
const app = express();

app.use(express.json());
app.use("/category", categoryRoute)
app.use("/products", productRoutes);

app.listen(process.env.PORT, () => {
  console.log("server is running");
});
