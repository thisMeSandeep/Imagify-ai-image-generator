import jwt from 'jsonwebtoken';
import UserModel from '../models/user.model.js';

const generateToken = async (email, res) => {
  try {
    const user = await UserModel.findOne({ email });
    
    if (!user) {
      throw new Error('User not found');
    }

    const payload = {
      id: user._id,
      email: user.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: '7d',
    });

    // Define cookie options
    const options = {
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'strict', 
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    };

    // Set the token as a cookie on the response
    res.cookie('token', token, options);

  } catch (err) {
    console.log('Error generating token:', err.message);
    throw err;
  }
};

export default generateToken;
