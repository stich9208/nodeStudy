import path from "path";
import Video from "../models/Video";

//upload video
export const uploadVideo = async (req, res) => {
  const { title, description, hashtags } = req.body;
  try {
    await Video.create({
      title,
      description,
      hashtags: hashtags.split(",").map((tag) => `#${tag.trim()}`),
    });
  } catch (err) {
    console.log("upload video", err);
    return res.status(404).send({ message: "can`t upload video" });
  }
  return res.send({ message: "success" });
};

//read video list
export const readVideo = async (req, res) => {
  try {
    const videos = await Video.find({});
    return res.json({ videos });
  } catch (err) {
    return res.sendStatus(404).send({ message: "not found videos", err });
  }
};

//read detail info video
export const detailVideo = async (req, res) => {
  const { id } = req.params;
  try {
    const video = await Video.findById(id);
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

export const search = (req, res) => {
  res.send("<h1>SEARCH!</h1>");
};
