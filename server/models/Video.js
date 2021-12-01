import mongoose from "mongoose";

const videoSchema = mongoose.Schema({
  title: String,
  comments: Number,
  createdAd: Date,
  hashtags: [{ type: String }],
  meta: {
    views: Number,
    rating: Number,
  },
});

const Video = mongoose.model("Video", videoSchema);

export default Video;
