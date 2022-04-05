import express from "express";
import multer from "multer";
import {
  detailVideo,
  uploadVideo,
  editVideo,
  deleteVideo,
  readVideo,
  searchVideo,
  addComment,
} from "../controllers/videoController";
import { authMiddleware } from "../middlewares/authMiddleware";

const upload = multer();

const videoRouter = express.Router();

videoRouter.get("/videos", readVideo);
videoRouter.post("/upload", authMiddleware, upload.single("file"), uploadVideo);
videoRouter.get("/video/:id([0-9a-f]{24})", detailVideo);
videoRouter.put("/video/edit/:id([0-9a-f]{24})", authMiddleware, editVideo);
videoRouter.delete(
  "/video/:id([0-9a-f]{24})/delete",
  authMiddleware,
  deleteVideo
);
videoRouter.get("/search", searchVideo);
videoRouter.post("/video/comment", authMiddleware, addComment);

export default videoRouter;
