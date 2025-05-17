import pool from '../config/db.js';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { Op } from 'sequelize';
import { QdrantClient } from '@qdrant/js-client-rest';
import db from '../models/index.js';
import axios from 'axios';

const bk = db.baseknowledge;

// Set destination folder
const uploadFolder = path.resolve('uploads');

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

export const upload = multer({ storage });

export async function getBaseKnowledge(req, res) {
  try {
    const result = await bk.findAll();
    res.json(result);

    // Optional Qdrant usage:
    // const client = new QdrantClient({
    //   url: "https://your-qdrant-url",
    //   apiKey: "your_api_key_here",
    // });
    // const collections = await client.getCollections();
    // console.log('List of collections:', collections);

  } catch (error) {
    console.error('Error fetching knowledge:', error);
    res.status(500).json({ error: 'Failed to fetch knowledge' });
  }
}

export async function postBaseKnowledge(req, res) {
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
}

export async function searchBaseKnowledge(req, res) {
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
}

export async function upsertKnowledge(req, res) {
  try {
    const filePath = path.join(uploadFolder, req.file.filename);
    const content = fs.readFileSync(filePath, 'utf-8');

    const data = {
      id: req.file.filename,
      payload: {
        content: content,
        filename: req.file.originalname
      }
    };

    const response = await axios.post(
      'https://48b49ac1-8387-42bb-b0d7-10587d2aa625.eu-west-1-0.aws.cloud.qdrant.io:6333/collections',
      data
    );

    res.status(200).json({ message: 'Upsert successful', response: response.data });
  } catch (error) {
    console.error('Error in upsertKnowledge:', error);
    res.status(500).json({ error: 'Failed to upsert knowledge' });
  }
}
