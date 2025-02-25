const pool = require('../config/db'); // Use CommonJS require

// Controller function to fetch all admins
async function getAdmins(req, res) {
  try {
    const result = await pool.query('SELECT * FROM admins');
    res.json(result.rows);
  } catch (err) {
    console.error('Error', err);
    res.status(500).json({ err: 'Failed to fetch' });
  }
}

// async function registerAdmins(req, res){
//   try{
//     const userExist = await pool.query(`SELECT * FROM admins where ` req ` = nippm`)
//     if(userExist){
//       sendResponse(res, 400, "error", [], 'user has been registered')
//     }else{

//     }

//   }
// }

module.exports = { getAdmins }; // Correct CommonJS export
