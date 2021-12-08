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

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 5);
};

userSchema.pre("save", async function () {
  try {
    this.password = await hashPassword(this.password);
  } catch (err) {
    throw new Error(err);
  }
});

const User = mongoose.model("User", userSchema);

export default User;
