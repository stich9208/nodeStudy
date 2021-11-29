import express from "express";
import morgan from "morgan";

const app = express();
const logger = morgan("dev");

const PORT = 4000;

//controller
const handleListen = () => {
  console.log(`🌐 port ${PORT} is open!!`);
};
const handleHome = (req, res) => {
  res.send("<h1>HOME!</h1>");
};
const handleLogin = (req, res) => {
  res.send("<h1>LOGIN!</h1>");
};

//use middleware globally
app.use(logger);

app.get("/", handleHome);
app.get("/login", handleLogin);

app.listen(PORT, handleListen);
