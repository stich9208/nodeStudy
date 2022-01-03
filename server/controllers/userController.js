import User from "../models/User";
import mongoose from "mongoose";

//=====join=====
export const join = async (req, res) => {
  const { email, username, password } = req.body;
  try {
    await User.create({
      email,
      username,
      password,
    });
  } catch (err) {
    if (err.code === 11000) {
      const dupKey = Object.keys(err.keyPattern)[0];
      return res.status(404).send({
        message: "duplicated",
        dupKey,
      });
    }
    return res.status(404).send({
      message: "can`t create user",
    });
  }
  return res.status(200).send({ message: "success" });
};

//=====login=====
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    const isPassword = await user.comparePassword(password);
    if (!user) {
      return res.send({ message: "no match user" });
    }
    if (!isPassword) {
      return res.send({ message: "please check your password!" });
    }
    const token = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    res
      .cookie("webToken", {
        token,
        refreshToken,
      })
      .status(200)
      .send({
        message: "success",
      });
  } catch (err) {
    console.log("login err", err);
    res.status(404).send({ message: "fail", err });
  }
};

//=====detail=====
export const detail = async (req, res) => {
  console.log("detail");
  const { id } = req.params;
  // try {
  //   const user = await User.findById({ id });
  //   return res.status(200).send({ message: "success", user });
  // } catch (err) {
  //   console.log(err);
  //   return res.status(404).send({ message: "find user fail" });
  // }
  res.end();
};

//=====edit=====
export const edit = async (req, res) => {
  const { refreshToken } = req.cookies.webToken;
  const { email, username, _id } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      _id,
      { email, username },
      { returnDocument: "after" }
    );
    const token = await user.generateAccessToken();
    res
      .cookie("webToken", { token, refreshToken })
      .status(200)
      .send({ message: "success" });
  } catch (err) {
    console.log(err);
    res.status(404).send({ message: "fail", err });
  }
};

//=====check password=====
export const checkPassword = async (req, res) => {
  const { password, userInfo } = req.body;
  try {
    const user = await User.findById(userInfo._id);
    const isMatch = await user.comparePassword(password);
    if (isMatch) {
      return res.send({ message: "success" });
    }
    return res.send({ message: "wrong password" });
  } catch (err) {
    console.log(err);
    return res.status(404).send({ message: "fail", err });
  }
};

//=====change password=====
export const changePassword = async (req, res) => {
  const { newPassword, userInfo } = req.body;
  try {
    const user = await User.findById(userInfo._id);
    user.password = newPassword;
    user.save();
    return res.send({ message: "success" });
  } catch (err) {
    console.log(err);
    return res.status(404).send({ message: "fail", err });
  }
};

//=====user video list=====
export const getUserVideoList = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById({
      _id: mongoose.Types.ObjectId(id),
    }).populate("videos");
    return res.status(200).send({ message: "success", videoList: user.videos });
  } catch (err) {
    console.log(err);
    return res.status(404).send({ message: "find user fail" });
  }
};

export const logout = (req, res) => {
  res.send("<h1>LOGOUT!</h1>");
};

export const remove = (req, res) => {
  res.send("<h1>REMOVE USER!</h1>");
};

export const auth = (req, res) => {
  res.send({ message: "success" });
};
