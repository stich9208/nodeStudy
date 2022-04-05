import app from "./server";
import dotenv from "dotenv";
import "./db.js";
import "./storage.js";
import "./models/Video";
import "./models/User";
import "./models/Comment";

dotenv.config();

const PORT = 4000;

const handleListen = () => {
  console.log(`🌐 port ${PORT} is open!!`);
};

app.listen(PORT, handleListen);
