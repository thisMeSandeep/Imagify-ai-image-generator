import jwt from "jsonwebtoken";

const auth =  (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    console.log("error getting token:", err.message);
    return res.status(401).json({ message: "Invalid token." });
  }
};

export default auth;
