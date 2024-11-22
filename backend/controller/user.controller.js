import UserModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import generateToken from "../config/generateToken.js";

//register user

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check for all fields
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please fill all fields!",
        success: false,
      });
    }

    // Check if email already exists
    const emailExists = await UserModel.findOne({ email });
    if (emailExists) {
      return res.status(400).json({
        message: "Email already registered!",
        success: false,
      });
    }

    // Hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new UserModel({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();

    // Generate token
    generateToken(email, res);

    return res.status(200).json({
      success: true,
      message: "Registration Successful",
      user: { name: user.name },
    });
  } catch (err) {
    console.error("Error during user registration:", err);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
