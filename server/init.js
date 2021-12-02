import "./db.js";
import "./models/Video";
import app from "./server";

const PORT = 4000;

const handleListen = () => {
  console.log(`🌐 port ${PORT} is open!!`);
};

app.listen(PORT, handleListen);
