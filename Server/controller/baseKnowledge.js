import pool from '../config/db.js';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { Op } from 'sequelize';
import { QdrantClient } from '@qdrant/js-client-rest';  // Assuming named export
import db from '../models/index.js';
import axios from 'axios';

const bk = db.baseknowledge;

// Set destination folder
const uploadFolder = path.resolve('uploads'); // Adjust __dirname usage in ESM context

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
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// Get all knowledge
const getBaseKnowledge = async (req, res) => {
  try {
    const result = await bk.findAll();
    res.json(result);

    // Example for Qdrant client usage if needed:
    // const client = new QdrantClient({
    //   url: "https://48b49ac1-8387-42bb-b0d7-10587d2aa625.eu-west-1-0.aws.cloud.qdrant.io",
    //   apiKey: "your_api_key_here",
    // });
    // const collections = await client.getCollections();
    // console.log('List of collections:', collections);
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

    if (!file) {
      return res.status(404).json({ error: "File does not exist, please check again" });
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
    const filePath = path.join(uploadFolder, req.file.filename);
    const content = fs.readFileSync(filePath, 'utf-8');

    const data = {
      id: req.file.filename,  // or another unique identifier
      payload: {
        content: content,
        filename: req.file.originalname
      }
    };

    // Example axios call - adjust URL and body as needed
    const response = await axios.post('https://48b49ac1-8387-42bb-b0d7-10587d2aa625.eu-west-1-0.aws.cloud.qdrant.io:6333/collections', data);

    res.status(200).json({ message: 'Upsert successful', response: response.data });
  } catch (error) {
    console.error('Error in upsertKnowledge:', error);
    res.status(500).json({ error: 'Failed to upsert knowledge' });
  }
};

export { getBaseKnowledge, postBaseKnowledge, upload, searchBaseKnowledge, upsertKnowledge };
