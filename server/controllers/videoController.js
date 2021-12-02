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
  const video = new Video({
    title,
    description,
    createdAt: new Date(),
    hashtags: hashtags.split(",").map((tag) => `#${tag.trim()}`),
    meta: {
      views: 0,
      rating: 0,
    },
  });
  const createdVideo = await video.save();
  return res.send({ message: "success" });
};

export const detailVideo = (req, res) => {
  res.send(`<h1>DETAIL VIDEO ID:${req.params.id}!</h1>`);
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
