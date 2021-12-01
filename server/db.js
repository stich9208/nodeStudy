import mongoose from "mongoose";

mongoose
  .connect("mongodb://127.0.0.1:27017/nodestudy")
  .then(() => console.log("🌳 mongodb connected"))
  .catch((err) => console.log("🚨 mongodb error", err));