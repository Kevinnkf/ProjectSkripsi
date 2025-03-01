const pool = require('../config/db'); // Ensure this is the correct path to your DB config

// Controller function to fetch all knowledge
const getBaseKnowledge = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM baseKnowledge');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching knowledge:', error);
    res.status(500).json({ error: 'Failed to fetch knowledge' });
  }
};
 
const postBaseKnowledge = async (req, res)=>{
  try {
    const result = await pool.query()
  } catch (error) {
    
  }
}

module.exports = { getBaseKnowledge };
