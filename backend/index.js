import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import userRouter from "./routes/user.routes.js";
import imageRouter from "./routes/image.routes.js";

const app = express();
const PORT = process.env.PORT || 4000;

const corsOptions = {
  origin: ["https://deploy-mern-1whq.vercel.app"],
  methods:["POST" , "GET"],
  credentials: true, 
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

//routes

app.use("/api/user", userRouter);
app.use("/api/image", imageRouter);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
  });
});
