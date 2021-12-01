import express from "express";
import path from "path";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import "./db.js";

const app = express();
const logger = morgan("dev");
const PORT = 4000;
//use middleware globally
app.use(logger);
app.use(express.static(path.join(__dirname, "../client/build")));

app.use("/api", videoRouter);
app.use("/", globalRouter);

//controller
const handleListen = () => {
  console.log(`🌐 port ${PORT} is open!!`);
};

app.listen(PORT, handleListen);
