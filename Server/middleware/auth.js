import jwt from 'jsonwebtoken';
import db from "../models/index.js";

const User = db.admins;

export const isAuthenticated = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1] || req.cookies.SessionID;

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

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({
      status: "failed",
      message: "Invalid or expired token",
    });
  }
};


// // Server/middleware/auth.js
// import jwt from 'jsonwebtoken';
// import db from "../models/index.js";

// const User = db.admins;

// export const isAuthenticated = async (req, res, next) => {
//   const token = req.cookies?.SessionID; // ✅ Read from cookies
//   console.log("Token from cookie:", token);

//   if (!token) {
//     return res.status(401).json({
//       status: "failed",
//       message: "Unauthorized access",
//     });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.SECRET_ACCESS_TOKEN);
//     const user = await User.findByPk(decoded.id);

//     if (!user) {
//       return res.status(401).json({ message: "User not found" });
//     }

//     req.user = user;
//     next();
//   } catch (err) {
//     return res.status(401).json({
//       status: "failed",
//       message: "Invalid or expired token",
//     });
//   }
// };
