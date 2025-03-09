const bcrypt = require('bcrypt')
const pool = require('../config/db'); // Use CommonJS require

const getAdmins = async (req, res)=>{
  try {
    const result = await pool.query('SELECT * FROM admins')
    res.json(result.rows)
  } catch (err) {
    console.error("Error", err)
    res.status(500).json({
      err: 'Failed'
    })
  }
}

const registerAdmins = async (req, res)=>{
  try {
    
    // define request body
    const {nippm, password, role} = req.body
    
    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, 10); // 10 rounds of salting

    // Insert to db
    const result = await pool.query(
      'INSERT INTO admins ("nippm", "password", "role", "created_at") VALUES ($1, $2, $3, NOW()) RETURNING *',
      [nippm, hashedPassword, role]
    );
    
    res.status(201).json({
      message: "Registered successfully",
      admin: result.rows[0]
    })
  } catch (error) {
    console.error("Error registering admin", error)
    console.log("Request Body: ", req.body)
    res.status(500).json({
      error: "Failed to register"
    })
    
  }
}

module.exports = { getAdmins, registerAdmins }; // Correct CommonJS export
