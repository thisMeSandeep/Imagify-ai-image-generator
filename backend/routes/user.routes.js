import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  userCredit,
} from "../controller/user.controller.js";
import auth from "../middleware/authMiddleware.js";

const userRouter = express.Router();

userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/logout").post(auth, logoutUser);
userRouter.route("/credit").post(auth, userCredit);

export default userRouter;
