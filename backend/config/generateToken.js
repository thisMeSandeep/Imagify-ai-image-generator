import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";

const generateToken = async (email, res) => {
  try {
    // Find the user based on email
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    // Payload for JWT
    const payload = {
      id: user._id,
      email: user.email,
    };

    // Sign the token
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

    // cookie options
    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    };

    // Set the cookie in the response
    res.cookie("token", token, options);
  } catch (err) {
    console.log("Error generating token:", err.message);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export default generateToken;
