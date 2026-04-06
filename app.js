import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/dbConfig.js";
import categoryRoute from './routes/categoryRoute.js';

dotenv.config();
connectDB();
const app = express();

app.use(express.json());
app.use("/category", categoryRoute)

app.listen(process.env.PORT, () => {
  console.log("server is running");
});
