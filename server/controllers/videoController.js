import Video from "../models/Video";
import User from "../models/User";
import Comment from "../models/Comment";
import dotenv from "dotenv";

import { uploadVideoToStorage } from "../storage";
import { getFileExtension } from "../util";

dotenv.config();

//upload video
export const uploadVideo = async (req, res) => {
  const { title, description, hashtags, id } = req.body;
  const videoFile = req.file;
  const fileExtension = getFileExtension(videoFile.originalname).toLowerCase();
  const url = `${process.env.END_POINT}/${
    process.env.BUCKET_NAME
  }/video/${encodeURIComponent(title)}.${fileExtension}`;

  try {
    await uploadVideoToStorage(videoFile.buffer, title + "." + fileExtension);
    const newVideo = await Video.create({
      title,
      description,
      hashtags: hashtags.split(",").map((tag) => `#${tag.trim()}`),
      owner: id,
      url,
    });
    const user = await User.findById({ _id: id });
    user.videos.push(newVideo._id);
    user.save();
  } catch (err) {
    console.log("upload video error", err);
    return res.status(404).send({ message: "can`t upload video" });
  }
  return res.send({ message: "success" });
};

//read video list
export const readVideo = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({ createdAt: "desc" });
    return res.json({ videos });
  } catch (err) {
    return res.sendStatus(404).send({ message: "not found videos", err });
  }
};

//read detail info video
export const detailVideo = async (req, res) => {
  const { id } = req.params;
  try {
    const video = await Video.findById({ _id: id })
      .populate({
        path: "comments",
        populate: { path: "owner" },
      })
      .populate({
        path: "owner",
      });
    return res.send({ video });
  } catch (err) {
    console.log("detail video", err);
    return res.status(404).send({ message: "can`t get video" });
  }
};

//edit video
export const editVideo = async (req, res) => {
  const { _id, title, description, hashtags } = req.body;
  try {
    const video = await Video.findByIdAndUpdate(_id, {
      title,
      description,
      hashtags,
    });
    return res.send({ message: "success", video });
  } catch (err) {
    console.log("edit video", err);
    return res.status(404).send({ message: "failed to edit video" });
  }
};

//delete video
export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedVideo = await Video.findByIdAndDelete(id);
    return res.send({ message: "success", deletedVideo });
  } catch (err) {
    console.log("delete video", err);
    return res.status(404).send({ message: "failed to delete video" });
  }
};

//search video
export const searchVideo = async (req, res) => {
  const { keyword } = req.query;
  let videos = [];
  if (keyword) {
    try {
      videos = await Video.find({
        title: {
          $regex: new RegExp(keyword, "i"),
        },
      });
      return res.send({ message: "success", videos });
    } catch (err) {
      console.log(err);
    }
  }
};

//add comment
export const addComment = async (req, res) => {
  const { content, videoId, userId } = req.body;
  try {
    const newComment = await Comment.create({
      text: content,
      owner: userId,
      video: videoId,
    });
    const video = await Video.findById({ _id: videoId });
    video.comments.unshift(newComment._id);
    video.save();
    return res.status(200).send({ message: "success" });
  } catch (err) {
    console.log(err);
    return res.status(404).send({ message: "fail" });
  }
};
