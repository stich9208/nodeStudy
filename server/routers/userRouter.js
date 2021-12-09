import express from "express";
import {
  detail,
  edit,
  logout,
  remove,
  join,
  login,
  auth,
} from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";

const userRouter = express.Router();

userRouter.post("/join", join);
userRouter.post("/login", login);
userRouter.get("/edit", edit);
userRouter.get("/logout", logout);
userRouter.get("/remove", remove);
userRouter.get("/:id(\\d+)", detail);
userRouter.get("/auth", authMiddleware, auth);

export default userRouter;
