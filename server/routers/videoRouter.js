import express from "express";
import {
  detailVideo,
  upload,
  editVideo,
  deleteVideo,
  readVideos,
} from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/videos", readVideos);
// videoRouter.get("/:id(\\d+)", detailVideo);
// videoRouter.get("/:id(\\d+)/edit", editVideo);
// videoRouter.get("/:id(\\d+)/delete", deleteVideo);

export default videoRouter;
