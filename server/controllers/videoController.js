import path from "path";
import Video from "../models/Video";

export const trending = (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/build/index.html"));
};

export const search = (req, res) => {
  res.send("<h1>SEARCH!</h1>");
};

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

export const editVideo = (req, res) => {
  res.send(`<h1>EDIT VIDEO ID:${req.params.id}!</h1>`);
};

export const deleteVideo = (req, res) => {
  res.send(`<h1>DELETE VIDEO! ID:${req.params.id}</h1>`);
};

export const readVideo = async (req, res) => {
  try {
    const videos = await Video.find({});
    return res.json({ videos });
  } catch (err) {
    return res.sendStatus(404).send({ message: "not found videos", err });
  }
};
