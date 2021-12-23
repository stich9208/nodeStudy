import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("🌳 mongodb connected"))
  .catch((err) => console.log("🚨 mongodb error", err));
