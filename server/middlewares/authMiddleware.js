import jwt from "jsonwebtoken";
import User from "../models/User";

export const authMiddleware = async (req, res, next) => {
  console.log("in middleware!");
  const { token, refreshToken } = req.cookies.webToken;
  try {
    const decoded = jwt.verify(token, "secret");
    const { _id } = decoded;
    const isMatch = await User.exists({ _id });
    if (isMatch) {
      return next();
    }
    throw new Error("no Match user!");
  } catch (err) {
    if (err.message === "jwt expired") {
      try {
        const refreshDecoded = jwt.verify(refreshToken, "secret");
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
