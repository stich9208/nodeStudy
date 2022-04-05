import mongoose from "mongoose";

const videoSchema = mongoose.Schema({
  title: { type: String, required: true, maxLengh: 100 },
  description: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  hashtags: [{ type: String }],
  meta: {
    views: { type: Number, required: true, default: 0 },
    rating: { type: Number, required: true, default: 0 },
  },
  url: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

const Video = mongoose.model("Video", videoSchema);

export default Video;
