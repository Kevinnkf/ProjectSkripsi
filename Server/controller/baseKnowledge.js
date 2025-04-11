const pool = require('../config/db');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const db = require('../models');
const bk = db.baseknowledge;

// Set destination folder
// const uploadFolder = path.join(__dirname, '../uploads') || process.env.UPLOAD_DIR;
const uploadFolder = path.join(__dirname, '../uploads');

// Ensure upload folder exists
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder);
}

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadFolder);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// Get all knowledge
const getBaseKnowledge = async (req, res) => {
  try {
    const result = await bk.findAll();
    res.json(result);
  } catch (error) {
    console.error('Error fetching knowledge:', error);
    res.status(500).json({ error: 'Failed to fetch knowledge' });
  }
};

// Post new knowledge
const postBaseKnowledge = async (req, res) => {
  try {
    const { notes, created_by } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "File is required" });
    }

    // Save to DB
    const result = await bk.create({
      filename: file.filename,
      notes,
      created_by,
      created_at: new Date()
    });

    res.status(201).json({
      message: "Base knowledge added successfully",
      data: result
    });
  } catch (error) {
    console.error("Error posting base knowledge:", error);
    res.status(500).json({ error: "Failed to post base knowledge" });
  }
};

module.exports = { getBaseKnowledge, postBaseKnowledge, upload };
