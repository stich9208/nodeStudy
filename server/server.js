import express from "express";
import path from "path";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const app = express();
const logger = morgan("dev");
//use middleware globally

app.use(express.static(path.join(__dirname, "../client/build")));

app.use(express.json());
app.use(logger);
app.use("/api", videoRouter);
app.use("/", globalRouter);

export default app;
