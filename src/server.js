import express from "express";

const app = express();

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

//middleware
const logMethod = (req, res, next) => {
  console.log(`METHOD: ${req.method}`);
  next();
};
const logPath = (req, res, next) => {
  console.log(`PATH: ${req.path}`);
  next();
};

//use middleware globally
app.use(logMethod, logPath);

app.get("/", handleHome);
app.get("/login", handleLogin);

app.listen(PORT, handleListen);
