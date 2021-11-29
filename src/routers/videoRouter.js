import express from "express";
import { videoHome } from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/", videoHome);

export default videoRouter;
