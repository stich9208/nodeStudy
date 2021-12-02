import express from "express";
import {
  detailVideo,
  uploadVideo,
  editVideo,
  deleteVideo,
  readVideo,
} from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/videos", readVideo);
videoRouter.post("/upload", uploadVideo);
// videoRouter.get("/:id(\\d+)", detailVideo);
// videoRouter.get("/:id(\\d+)/edit", editVideo);
// videoRouter.get("/:id(\\d+)/delete", deleteVideo);

export default videoRouter;
