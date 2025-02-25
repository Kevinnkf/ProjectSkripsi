const pool = require('../config/db'); // Ensure this is the correct path to your DB config

// Controller function to fetch all admins
const baseKnowledge = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM baseKnowledge');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching knowledge:', error);
    res.status(500).json({ error: 'Failed to fetch knowledge' });
  }
};

module.exports = { getAdmins };
