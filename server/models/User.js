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
  token: String,
  refreshToken: String,
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

userSchema.methods.comparePassword = async function (purePassword) {
  const user = this;
  return await bcrypt.compare(purePassword, user.password);
};

userSchema.methods.generateAccessToken = function (callback) {
  const user = this;
  const { _id, name, email } = user;
  const JWT = jwt.sign({ _id, name, email }, "secret", {
    expiresIn: "1h",
  });
  user.token = JWT;
  user.save((err, user) => {
    if (err) callback(err);
    callback(null, user);
  });
};

userSchema.methods.generateRefreshToken = function (callback) {
  const user = this;
  const { token } = user;
  const JWT = jwt.sign({ token }, "secret", {
    expiresIn: "10h",
  });
  user.refreshToken = JWT;
  user.save((err, user) => {
    if (err) callback(err);
    callback(null, user);
  });
};

const User = mongoose.model("User", userSchema);

export default User;
