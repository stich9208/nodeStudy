import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: { type: String, required: true, minlength: 5 },
});

const User = mongoose.model("User", userSchema);

export default User;
