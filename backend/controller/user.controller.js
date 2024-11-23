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
        message: "Please fill all the required fields!",
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
    await generateToken(email, res);

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

//login user

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for credentials
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the required fields!",
      });
    }

    const user = await UserModel.findOne({ email });

    // Check for email
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Email is not registered!",
      });
    }

    // Check for password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid password!",
      });
    }

    await generateToken(email, res);

    return res.status(200).json({
      success: true,
      message: "Login Successful!",
      user: { name: user.name },
      creditBalance: user.creditBalance,
    });
  } catch (err) {
    console.log("Error logging in user:", err.message);
    return res.status(500).json({
      message: "Internal server error!",
      success: false,
    });
  }
};

//logout user

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({
      success: true,
      message: "Logout Successful",
    });
  } catch (err) {
    console.log("Logout error:", err.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
};

//user credit

export const userCredit = async (req, res) => {
  try {
    const email = req.user.email;

    console.log(email);

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not found",
      });
    }

    res.status(200).json({
      success: true,
      credits: user.creditBalance,
      user: { name: user.name },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
