import express from "express";
import {
  detail,
  edit,
  logout,
  remove,
  join,
  login,
  auth,
  checkPassword,
  changePassword,
  getUserVideoList,
} from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";

const userRouter = express.Router();

userRouter.post("/join", join);
userRouter.post("/login", login);
userRouter.put("/edit", authMiddleware, edit);
userRouter.get("/logout", authMiddleware, logout);
userRouter.get("/remove", authMiddleware, remove);
userRouter.get("/videolist/:id", authMiddleware, getUserVideoList);
userRouter.post("/checkpassword", authMiddleware, checkPassword);
userRouter.put("/changepassword", authMiddleware, changePassword);
userRouter.get("/auth", authMiddleware, auth);

export default userRouter;
