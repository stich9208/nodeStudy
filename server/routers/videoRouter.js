import express from "express";
import {
  detailVideo,
  uploadVideo,
  editVideo,
  deleteVideo,
  readVideo,
  searchVideo,
} from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/videos", readVideo);
videoRouter.post("/upload", uploadVideo);
videoRouter.get("/video/:id([0-9a-f]{24})", detailVideo);
videoRouter.put("/video/edit/:id([0-9a-f]{24})", editVideo);
videoRouter.delete("/video/:id([0-9a-f]{24})/delete", deleteVideo);
videoRouter.get("/search", searchVideo);

export default videoRouter;
