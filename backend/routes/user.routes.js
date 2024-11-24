import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  userCredit,
  paymentRazorPay,
  verifyRazorPay,
} from "../controller/user.controller.js";
import auth from "../middleware/authMiddleware.js";

const userRouter = express.Router();

userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/logout").post(auth,logoutUser);
userRouter.route("/credits").get(auth, userCredit);
userRouter.route("/pay-razor").post(auth, paymentRazorPay);
userRouter.route("/verify-razor").post(auth, verifyRazorPay);

export default userRouter;
