import UserModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import generateToken from "../config/generateToken.js";
import Razorpay from "razorpay";
import TransactionModel from "../models/transaction.model.js";
import dotenv from "dotenv";
dotenv.config();

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

//razorpay instance

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const paymentRazorPay = async (req, res) => {
  try {
    const { planId } = req.body;
    const userId = req.user.id;

    if (!userId || !planId) {
      return res.status(400).json({
        success: false,
        message: "Missing details",
      });
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    let credits, amount;
    switch (planId) {
      case "Basic":
        credits = 100;
        amount = 10;
        break;
      case "Advanced":
        credits = 500;
        amount = 50;
        break;
      case "Business":
        credits = 5000;
        amount = 250;
        break;
      default:
        return res.status(400).json({
          success: false,
          message: "Plan not found",
        });
    }

    const transactionData = {
      userId,
      plan: planId,
      amount,
      credits,
      date: new Date(),
    };

    const newTransaction = await TransactionModel.create(transactionData);

    const options = {
      amount: amount * 100,
      currency: process.env.CURRENCY,
      receipt: newTransaction._id.toString(),
    };

    razorpayInstance.orders.create(options, (error, order) => {
      if (error) {
        console.error("Razorpay Order Creation Error:", error);
        return res.status(500).json({
          success: false,
          message: "Order creation failed",
          error: error.message,
        });
      }
      return res.status(200).json({
        success: true,
        order,
      });
    });
  } catch (err) {
    console.error("Payment Processing Error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

export const verifyRazorPay = async (req, res) => {
  try {
    const { razorpay_order_id } = req.body;
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

    if (orderInfo.status === "paid") {
      const transactionData = await TransactionModel.findById(orderInfo.receipt);
      
      if (!transactionData) {
        return res.status(404).json({
          success: false,
          message: "Transaction not found",
        });
      }

      if (transactionData.payment) {
        return res.status(400).json({
          success: false,
          message: "Payment already processed",
        });
      }

      const userData = await UserModel.findById(transactionData.userId);

      if (!userData) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      const newCreditBalance = userData.creditBalance + transactionData.credits;

      await UserModel.findByIdAndUpdate(userData._id, { creditBalance: newCreditBalance });

      await TransactionModel.findByIdAndUpdate(transactionData._id, {
        payment: true,
      });

      return res.status(200).json({
        success: true,
        message: "Credits added successfully",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Payment failed",
      });
    }
  } catch (err) {
    console.error("Error verifying payment:", err.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
