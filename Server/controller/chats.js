import pool from '../config/db.js'; // Make sure your db config also uses ESM and exports default
import { OpenAI } from "openai";
import dotenv from "dotenv";
import db from '../models/index.js';

dotenv.config();

const { Chat } = db;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Middleware to get IP address
const getClientIp = (req) => {
  return req.headers['x-forwarded-for']?.split(',')[0].trim() ||
         req.connection?.remoteAddress ||
         req.socket?.remoteAddress ||
         null;
};

// Get chat history including both user and bot messages for context
const getChatHistory = async (ipAddress) => {
  const chats = await Chat.findAll({
    where: { ip_address: ipAddress },
    order: [['created_at', 'ASC']],
    attributes: ['user_message', 'bot_response', 'created_at']
  });

  const messages = [];
  for (const chat of chats) {
    messages.push({ role: 'user', content: chat.user_message });
    messages.push({ role: 'assistant', content: chat.bot_response });
  }
  return messages;
};

const sendMessageToBot = async (req, res) => {
  try {
    const { message: userMessage } = req.body;
    if (!userMessage || typeof userMessage !== 'string') {
      return res.status(400).json({ error: "Valid message is required" });
    }

    const ipAddress = getClientIp(req);
    const history = await getChatHistory(ipAddress);
    
    const messages = [...history];
    messages.push({ role: "user", content: userMessage });

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
      temperature: 0.7
    });

    const botResponse = completion.choices[0].message.content;
    
    await Chat.create({
      ip_address: ipAddress,
      user_message: userMessage,
      bot_response: botResponse,
      // created_at: new Date() // if timestamps enabled
    });

    res.json({ userMessage, botReply: botResponse, ipAddress });
  } catch (error) {
    console.error("Error getting bot response:", error);
    res.status(500).json({ error: "Failed to get bot response" });
  }
};

const getMessageHistory = async (req, res) => {
  try {
    const ipAddress = getClientIp(req);
    const chats = await getChatHistory(ipAddress);

    res.json({ ipAddress, chats });
  } catch (error) {
    console.error('error fetching chats', error);
    res.status(500).json({ error: 'Failed fetching chats' });
  }
};

export { sendMessageToBot, getMessageHistory };
