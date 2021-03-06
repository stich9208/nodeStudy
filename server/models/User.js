import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: { type: String, required: true, minlength: 5 },
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
});

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 5);
};

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    try {
      this.password = await hashPassword(this.password);
    } catch (err) {
      throw new Error(err);
    }
  }
});

userSchema.methods.comparePassword = async function (purePassword) {
  const user = this;
  return bcrypt.compare(purePassword, user.password);
};

userSchema.methods.generateAccessToken = async function () {
  const user = this;
  const { _id, email, username } = user;
  const JWT = jwt.sign({ _id, email, username }, process.env.TOKEN_KEY, {
    expiresIn: "1h",
  });
  return JWT;
};

userSchema.methods.generateRefreshToken = async function () {
  const user = this;
  const { _id } = user;
  const JWT = jwt.sign({ _id }, process.env.TOKEN_KEY, {
    expiresIn: "10h",
  });
  return JWT;
};

const User = mongoose.model("User", userSchema);

export default User;
