const axios = require('axios');
require('dotenv').config();

const db   = require('../models');
const Chat = db.Chat;

// RAG endpoint 
const RAG_URL = process.env.RAG_SERVICE_URL || 'http://127.0.0.1:8000';

// client IP 
const getClientIp = req => {
  const forwarded = req.headers['x-forwarded-for'];
  let ip = forwarded
    ? forwarded.split(',')[0].trim()
    : req.socket.remoteAddress;

  // strip IPv4-mapped IPv6 prefix
  if (ip.startsWith('::ffff:')) {
    ip = ip.replace('::ffff:', '');
  }
  // map pure IPv6 loopback to IPv4
  if (ip === '::1') {
    ip = '127.0.0.1';
  }
  return ip;
};

// Get chat history by IP
const getChatHistory = async (ipAddress) => {
  return await Chat.findAll({
    where: { ip_address: ipAddress },
    order: [['created_at', 'ASC']],
    attributes: ['user_message', 'bot_response', 'created_at']
  });
};

// save a chat record
const saveChat = async (ipAddress, userMessage, botResponse) => {
  return Chat.create({
    ipAddress,
    user_message: userMessage,
    bot_response: botResponse,
    created_at:   new Date()
  });
};

// send user message → RAG service → save & reply
const sendMessageToBot = async (req, res) => {
  try {
    const { message: userMessage } = req.body;
    if (!userMessage || typeof userMessage !== 'string') {
      return res.status(400).json({ error: 'Valid message is required' });
    }

    const ipAddress = getClientIp(req);
    const history = await getChatHistory(ipAddress);

    // FastAPI RAG endpoint
    const ragRes = await axios.post(
      `${RAG_URL}/api/query`,
      { query: userMessage }
    );

    const botResponse = ragRes.data.answer;
    await saveChat(ipAddress, userMessage, botResponse);

    return res.json({
      userMessage,
      botReply: botResponse,
      ipAddress
    });
  } catch (err) {
    console.error('❌ sendMessageToBot error:', err);
    return res.status(500).json({ error: 'Failed to get bot response' });
  }
};

// expose all chat history
const getMessageHistory = async (req, res) => {
  try {
        const ipAddress = getClientIp(req)
        const chats = await getChatHistory(ipAddress)

        console.log(ipAddress)

        res.json({
          ipAddress: ipAddress,
          chats: chats
        })
    } catch (error) {
        console.error('error fetching chats', error)
        res.status(500).json({error: 'Failed fetching chats' })
    }
}

module.exports = { sendMessageToBot, getMessageHistory };