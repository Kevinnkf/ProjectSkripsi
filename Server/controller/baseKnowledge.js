const pool = require('../config/db');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { Op } = require('sequelize');
const client = require ('@qdrant/js-client-rest');

const db = require('../models');
const bk = db.baseknowledge;

// Set destination folder
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
    // client = new QdrantClient(
    //   url="https://48b49ac1-8387-42bb-b0d7-10587d2aa625.eu-west-1-0.aws.cloud.qdrant.io",
    //   api_key="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3MiOiJtIn0.1ugiYzO7TerHdVXROwWBNgIMkv3zMymBGeMrKXVvm68",
    // )
    // const hasil = await client.getCollections();
    // console.log('test'); 
    // console.log('List of collections:', hasil.collections);

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

const searchBaseKnowledge = async (req, res) => {
  try {
    const file = await bk.findOne({
      where: {
        filename: {
          [Op.iLike]: `%${req.params.filename}%`
        }
      }
    });

    if(!file){
      return "File does not exist, please check again"
    }
    
    res.json(file);
  } catch (error) {
    console.error("Error searching files", error);
    res.status(500).json({
      error: "failed: " + error.message
    });
  }
};

const upsertKnowledge = async (req, res) => {
  try {
    const file = path.join(__dirname, '../uploads');
    const content = fs.readFileSync(file, 'utf-8');

    const data = {
      id: filename,
      payload: {
        content: content,
        filename: req.file.originalName
      }
    }

    const response = await axios.post('https://48b49ac1-8387-42bb-b0d7-10587d2aa625.eu-west-1-0.aws.cloud.qdrant.io:6333/collections')


  } catch (error) {
    
  }
}


module.exports = { getBaseKnowledge, postBaseKnowledge, upload , searchBaseKnowledge};
