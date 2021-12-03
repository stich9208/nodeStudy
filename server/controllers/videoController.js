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
    console.log("create in db error", err);
    return res.status(404).send({ message: "failed" });
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
    console.log("detail video err", err);
    return res.status(404).send({ message: "fail" });
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
    console.log("video edit err", err);
    return res.status(404).send({ message: "fail" });
  }
};

export const deleteVideo = (req, res) => {
  res.send(`<h1>DELETE VIDEO! ID:${req.params.id}</h1>`);
};

export const search = (req, res) => {
  res.send("<h1>SEARCH!</h1>");
};
