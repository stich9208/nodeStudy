import express from "express";
import { detail } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/", detail);

export default userRouter;
