import express from "express";
import { generateImage } from "../controller/image.controller.js";
import auth from "../middleware/authMiddleware.js";

const imageRouter = express.Router();

imageRouter.route("/generate-image").post(auth, generateImage);

export default imageRouter;
