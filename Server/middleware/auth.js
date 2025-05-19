import jwt from 'jsonwebtoken';
import db from "../models/index.js"; // Make sure your models/index.js uses `export default`

const User = db.admins;

export const isAuthenticated = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; 
  console.log("Token from header:", token);

  if (!token) {
    return res.status(401).json({
      status: "failed",
      message: "Unauthorized access",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_ACCESS_TOKEN);

    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user; // attach user info to the request
    next();
  } catch (err) {
    return res.status(401).json({
      status: "failed",
      message: "Invalid or expired token",
    });
  }
};
