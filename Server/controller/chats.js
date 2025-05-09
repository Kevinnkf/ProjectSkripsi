const pool = require('../config/db'); // Ensure this is the correct path to your DB config
const { OpenAI } = require("openai");
require("dotenv").config();
const db = require('../models');
const Chat = db.Chat


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Middleware to IPAddress
const getClientIp = (req) => {
  return req.headers['x-forwarded-for']?.split(',')[0].trim() || 
         req.connection.remoteAddress;
};

// Saving chat to databse
const saveChat = async (ipAddress, userMessage, botResponse) =>{
  return await Chat.create({
    ipAddress: ipAddress,
    user_message: userMessage,
    bot_response: botResponse,
    created_at: new Date()
  })
}

const sendMessageToBot = async (req, res) => {
  try {
    const { message: userMessage } = req.body;
    if (!userMessage || typeof userMessage !== 'string') {
      return res.status(400).json({ error: "Valid message is required" });
    }

    const ipAddress = getClientIp(req);
    const history = await getChatHistory(ipAddress);
    
    // Prepare messages array in correct OpenAI format
    const messages = history.map(chat => ({
      role: "user",
      content: chat.user_message
    }));
    
    // Add current user message
    messages.push({
      role: "user",
      content: userMessage
    });

    // Get bot response - using the correct API format
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages, // Properly formatted messages array
      temperature: 0.7
    });

    const botResponse = completion.choices[0].message.content;
    
    // Save to database
    await saveChat(ipAddress, userMessage, botResponse);

    res.json({
      userMessage: userMessage,
      botReply: botResponse,
      ipAddress: ipAddress
    });
  } catch (error) {
    console.error("Error getting bot response:", error);
    console.log(process.env.OPENAI_API_KEY);
    res.status(500).json({ error: "Failed to get bot response" });
  }
};

// Get chat history by IP
const getChatHistory = async (ipAddress) => {
  return await Chat.findAll({
    where: { ip_address: ipAddress },
    order: [['created_at', 'ASC']],
    attributes: ['user_message', 'bot_response', 'created_at']
  });
};

const getMessageHistory = async (req, res) =>{
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

module.exports = { sendMessageToBot, getMessageHistory};
