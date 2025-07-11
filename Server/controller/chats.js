import { Op } from 'sequelize';
import axios from 'axios';
import dotenv from 'dotenv';
import db     from '../models/index.js';

dotenv.config();

const Chat = db.Chat;
const Feedback = db.Feedback;

const RAG_URL = process.env.RAG_SERVICE_URL || 'http://localhost:8000';

// normalize IPv4/IPv6
export function getClientIp(req) {
  const fwd = req.headers['x-forwarded-for'];
  let ip   = fwd ? fwd.split(',')[0].trim() : req.socket.remoteAddress;
  if (ip.startsWith('::ffff:')) ip = ip.replace('::ffff:', '');
  if (ip === '::1') ip = '127.0.0.1';
  return ip;
}

async function _getChatHistory(ip) {
  return Chat.findAll({
    where:      { ip_address: ip },
    order:      [['created_at','ASC']],
    attributes: ['user_message','bot_response','created_at']
  });
}

export async function getAllChatHistory(req, res){
  try{
    const chats = await Chat.findAll()

    return res.json(chats)
  }catch(error){
    return res.status(500).json({error: "error getting all chat history"})
  }
}

export async function getChatsWithFeedback(req, res) {
  try {
    const chats = await Chat.findAll({
      include: [
        {
          model: Feedback,
          as: 'feedback',
          required: true,
          attributes: ['response'],
        },
      ],
      order: [['created_at', 'ASC']],
      attributes: ['chat_id', 'user_message', 'bot_response', 'created_at'],
    });

    const result = chats.map(chat => ({
      chat_id: chat.chat_id,
      user_message: chat.user_message,
      bot_response: chat.bot_response,
      created_at: chat.created_at,
      feedback: chat.feedback?.response || null,
    }));

    return res.json(result);
  } catch (err) {
    console.error('getChatsWithFeedback error:', err);
    return res.status(500).json({ error: 'Failed to fetch chat history with feedback' });
  }
}

export async function getQuestionsCountThisWeek(req, res) {
  try {
    // --- Monday as start of week ---
    const today = new Date();
    const firstDayOfWeek = new Date(today);
    const day = today.getDay() === 0 ? 6 : today.getDay() - 1;
    firstDayOfWeek.setDate(today.getDate() - day);
    firstDayOfWeek.setHours(0, 0, 0, 0);

    const count = await Chat.count({
      where: {
        created_at: {
          [Op.gte]: firstDayOfWeek
        }
      }
    });

    res.json({ count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to count questions for this week' });
  }
}

async function _saveChat(ip, userMessage, botResponse) {
  return Chat.create({
    ip_address:    ip,
    user_message: userMessage,
    bot_response: botResponse,
    created_at:   new Date()
  });
}

export async function sendMessageToBot(req, res) {
  try {
    const { message: userMessage } = req.body;
    if (!userMessage) {
      return res.status(400).json({ error: 'Valid message is required' });
    }

    const ip = getClientIp(req);

    // call local RAG API
    const { data } = await axios.post(`${RAG_URL}/api/query`, { query: userMessage });
    const botResponse = data.answer;

    const saved = await _saveChat(ip, userMessage, botResponse);

    return res.json({
      userMessage,
      botReply: botResponse,
      ipAddress: ip,
      chat_id: saved.chat_id
    });
  } catch (err) {
    console.error('sendMessageToBot error:', err);
    return res.status(500).json({ error: 'Failed to get bot response' + err });
  }
}

export async function getMessageHistory(req, res) {
  try {
    const chats = await _getChatHistory(getClientIp(req));
    return res.json({ chats });
  } catch (err) {
    console.error('getMessageHistory error:', err);
    return res.status(500).json({ error: 'Failed fetching chats' });
  }
}
