import dotenv from 'dotenv';
import db from '../models/index.js';

dotenv.config();

const { Feedback } = db;

//GET /api/feedback
export async function getFeedback(req, res) {
  try {
    const all = await Feedback.findAll();
    return res.json(all);
  } catch (err) {
    console.error('❌ getFeedback error:', err);
    return res.status(500).json({ error: err.message });
  }
}

// POST /api/feedback/post
export async function sendFeedback(req, res) {
  try {
    const { chat_id, response } = req.body;

    if (!chat_id || !response) {
      return res.status(400).json({ error: 'chat_id and response are required' });
    }
    if (!['good', 'bad'].includes(response)) {
      return res.status(400).json({ error: 'response must be "good" or "bad"' });
    }

    const existing = await Feedback.findOne({ where: { chat_id } });
    if (existing) {
      return res.status(400).json({ error: 'Feedback for this chat_id already exists' });
    }

    const record = await Feedback.create({
      chat_id,
      response,
      created_at: new Date(),
    });

    return res.status(201).json({
      message: 'Feedback submitted successfully',
      feedback: record,
    });
  } catch (err) {
    console.error('❌ sendFeedback error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
