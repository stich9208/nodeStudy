import jwt from "jsonwebtoken";
import User from "../models/User";

export const authMiddleware = async (req, res, next) => {
  if (!req.cookies.webToken) {
    return res.status(401).send({ message: "login" });
  }
  const { token, refreshToken } = req.cookies.webToken;
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    const { _id } = decoded;
    const isMatch = await User.exists({ _id });
    if (isMatch) {
      return next();
    }
    throw new Error("no Match user!");
  } catch (err) {
    if (err.message === "jwt expired") {
      try {
        const refreshDecoded = jwt.verify(refreshToken, process.env.TOKEN_KEY);
        const user = await User.findById(refreshDecoded._id);
        const newToken = await user.generateAccessToken();
        res.cookie("webToken", {
          token: newToken,
          refreshToken,
        });
        return next();
      } catch (err) {
        if (err.message === "jwt expired") {
          return res.status(401).send({ message: "login" });
        }
      }
    }
    return res.status(401).send({ message: err.message, err });
  }
};
