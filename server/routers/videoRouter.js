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
videoRouter.get("/video/:id([0-9a-f]{24})", detailVideo);
videoRouter.get("/video/edit/:id([0-9a-f]{24})", editVideo);
// videoRouter.get("/:id(\\d+)/delete", deleteVideo);

export default videoRouter;
