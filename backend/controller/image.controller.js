import axios from "axios";
import UserModel from "../models/user.model.js";
import FormData from "form-data";

export const generateImage = async (req, res) => {
  try {
    const email = req.user.email;
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: "Please enter your text!",
      });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found!",
      });
    }

    if (user.creditBalance <= 0) {
      return res.status(400).json({
        success: false,
        message: "No credit balance",
        creditBalance: user.creditBalance,
      });
    }

    // Prepare multi-part form data
    const formData = new FormData();
    formData.append("prompt", prompt);

    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: {
          "x-api-key": process.env.CLIPDROP_API,
          ...formData.getHeaders(),
        },
        responseType: "arraybuffer",
      }
    );

    const base64Image = Buffer.from(data, "binary").toString("base64");
    const resultImage = `data:image/png;base64,${base64Image}`;

    await UserModel.updateOne(
      { email },
      { creditBalance: user.creditBalance - 1 }
    );

    return res.status(200).json({
      success: true,
      message: "Image generated",
      creditBalance: user.creditBalance - 1,
      resultImage: resultImage,
    });
  } catch (err) {
    console.error("Error generating image:", err.message);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
