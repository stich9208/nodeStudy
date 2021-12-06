import express from "express";
import {
  detail,
  edit,
  logout,
  remove,
  join,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.post("/join", join);
userRouter.get("/edit", edit);
userRouter.get("/logout", logout);
userRouter.get("/remove", remove);
userRouter.get("/:id(\\d+)", detail);

export default userRouter;
