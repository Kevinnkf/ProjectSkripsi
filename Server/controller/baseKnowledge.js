const pool = require('../config/db'); // Ensure this is the correct path to your DB config
const multer = require ('multer');

const storage = multer.memoryStorage();
const upload = multer({storage: storage});

// Controller function to fetch all knowledge
const getBaseKnowledge = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM baseknowledge');
    res.json(result.rows);

  } catch (error) {
    console.error('Error fetching knowledge:', error);
    res.status(500).json({ error: 'Failed to fetch knowledge' });
  }
};
 
const postBaseKnowledge = async (req, res)=>{
  try {
    const {notes, created_by, updated_by} = req.body
    const file = req.file;

    if(!file){
      return res.status(400).json({ error: "File is required" });
    }

    // Insert into database
    const result = await pool.query(
      `INSERT INTO baseknowledge ("content", "notes", "created_by", "created_at") 
       VALUES ($1, $2, $3, NOW()) RETURNING *`,
      [file.buffer, notes, created_by]
    );

    res.status(201).json({
      message: "Base knowledge added successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error posting base knowledge:", error);
    res.status(500).json({ error: "Failed to post base knowledge" });
  }
}

module.exports = { getBaseKnowledge, postBaseKnowledge, upload };
