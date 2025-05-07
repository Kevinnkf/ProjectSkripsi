const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const pool = require('../config/db'); // Use CommonJS require
const db = require("../models");
const { Op } = require('sequelize');
const Admin = db.admins;

async function login(req, res) {
  const { nippm, password } = req.body;

  try {
      // Fetch user including password using scope
      const user = await Admin.findOne({ where: { nippm } });

      if (!user) {
          return res.status(401).json({ error: 'Failed to login, please register first!' });
      } 

      // Compare password with hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
          return res.status(401).json({ error: 'Failed to login, Invalid NIPPM or password!' });
      }

      // Create token
      const token = jwt.sign(
          { id: user.id, role: user.role, nippm: user.nippm }, 
          process.env.SECRET_ACCESS_TOKEN, 
          { expiresIn: '20m' }
      );

      // Cookie options
      const cookieOptions = {
          maxAge: 20 * 60 * 1000,
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'None'
      };

      res.cookie("SessionID", token, cookieOptions);

      // Remove password before sending user data
      const { password: pwd, ...userData } = user.dataValues;

      const responseData = { ...userData, token };
      return res.status(200).json(responseData);
  } catch (err) {
      console.error(err);
      return res.status(500).json({error: "Internal server error"});
      
  }
}

const deleteById = async(req, res)=>{
  try {
    const findById = await Admin.findByPk(req.params.id);

    const result = await findById.destroy()

    res.json(result);
    console.log(result);
    
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting user" });
    
  }
}

const findAll = async(req, res)=>{
  try {
    const result = await Admin.findAll();
    res.json(result);
    console.log(result);
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({
      err: 'Failed: ' + error.message
    });
  };
};  

const registerAdmins = async (req, res) => {
  try {
    const { id, nippm, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await Admin.create({
      id,
      nippm,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      message: "Registered successfully",
      admin: newAdmin,
    });
  } catch (error) {
    console.error("Error registering admin", error);
    console.log("Request Body: ", req.body);

    if (!res.headersSent) {
      res.status(500).json({
        error: "Failed to register",
        detail: error.message,
      });
    }
  }
};

const searchAdmins = async (req, res ) => {
  try {
    const admin = await Admin.findOne({
      where: {
        nippm: {
          [Op.iLike]: `%${req.params.nippm}%` // Case-insensitive match
        }
      }
    });
    res.json(admin);
  } catch (error) {
    console.error("Erorr searching admin", error)
    res.status(500).json({
      error: "failed" + error.message
    })
  }
}


module.exports = {registerAdmins, findAll, deleteById, login, searchAdmins}; // Correct CommonJS export
