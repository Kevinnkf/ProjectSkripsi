import pool from '../config/db.js'; 
import { OpenAI } from "openai";
import dotenv from "dotenv";
import db from '../models/index.js';

dotenv.config();

const { Feedback } = db;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const getFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findAll();
    res.json(feedback);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const sendFeedback = async (req, res) => {
  try {
    const { chat_id, response } = req.body;

    // Check if required fields exist
    if (!chat_id || !response) {
      return res.status(400).json({ error: 'chat_id and response are required' });
    }

    // Validate response value
    if (!['good', 'bad'].includes(response)) {
      return res.status(400).json({ error: 'response must be either "good" or "bad"' });
    }

    // Check if feedback already exists
    const existingFeedback = await Feedback.findOne({ where: { chat_id } });

    if (existingFeedback) {
      return res.status(400).json({ error: 'Feedback for this chat_id already exists' });
    }

    // Save new feedback
    const result = await Feedback.create({
      chat_id,
      response,
      created_at: new Date(),
    });

    return res.status(201).json({
      message: 'Feedback submitted successfully',
      feedback: result,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export { sendFeedback, getFeedback };
