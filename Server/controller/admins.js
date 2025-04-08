const bcrypt = require('bcrypt')
const pool = require('../config/db'); // Use CommonJS require
const db = require("../models");
const Admin = db.admins;

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


module.exports = {registerAdmins, findAll, deleteById}; // Correct CommonJS export
