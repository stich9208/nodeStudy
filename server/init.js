import dotenv from "dotenv";
import "./db.js";
import "./models/Video";
import "./models/User";
import "./models/Comment";
import app from "./server";

dotenv.config();

const PORT = 4000;

const handleListen = () => {
  console.log(`🌐 port ${PORT} is open!!`);
};

app.listen(PORT, handleListen);
