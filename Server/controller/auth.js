const jwt = require('jsonwebtoken')
const pool = require('../config/db'); // Use CommonJS require
const bcrypt = require('bcrypt')

require("dotenv").config(); // Load .env variables


const login = async (req, res) => {
  try {
    const { nippm, password } = req.body;

    if (!nippm || !password) {
      return res.status(400).json({ error: "NIPPM and password are required" });
    }

    const result = await pool.query("SELECT * FROM admins WHERE nippm = $1", [nippm]);

    const user = result.rows[0];
    const isCorrect = await bcrypt.compare(password, user.password);

    if (!isCorrect) {
      console.log("Error Logging in:", req.body);
      console.log(user.password);
      console.log(password);
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user.id, // Include user ID for tracking
        nippm: user.nippm,
        role: user.role,
      },
      process.env.SECRET_KEY, // Ensure this is defined in .env
      { expiresIn: process.env.JWT_EXPIRES || "1h" }
    );

    res.status(200).json({
      message: "Logged in successfully",
      token,
      user: {
        id: user.id,
        nippm: user.nippm,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error Logging in:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


module.exports = { login }; 