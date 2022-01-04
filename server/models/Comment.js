import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  owner: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  video: { type: mongoose.Types.ObjectId, required: true, ref: "Video" },
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
