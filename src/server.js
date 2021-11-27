import express from "express";

const app = express();

const PORT = 3000;

const handleListen = () => {
  console.log(`🌐 port ${PORT} is open!!`);
};

const handleGet = (req, res) => {
  res.send("<h1>Hello Node!</h1>");
};

app.get("/", handleGet);

app.listen(PORT, handleListen);
