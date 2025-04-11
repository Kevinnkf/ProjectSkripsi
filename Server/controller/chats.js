const pool = require('../config/db'); // Ensure this is the correct path to your DB config
const { OpenAI } = require("openai");
require("dotenv").config();
const db = require('../models');
const Chat = db.chats


// example using OPENAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const sendMessageToBot = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // or "gpt-4" if you have access
      messages: [{ role: "user", content: message }],
    });
    const botResponse = response.choices[0].message.content
    const user_id = 2107412040

    const result = await Chat.create({
      user_id: user_id,
      user_message: message,
      bot_response: botResponse,
      chat_time: new Date(),
      created_at: new Date(),
    });

    res.json({
      botReply: botResponse,
      message: result
    });
  } catch (error) {
    console.error("Error getting bot response:", error);
    console.log(process.env.OPENAI_API_KEY);
    res.status(500).json({ error: "Failed to get bot response" });
  }
};

const getMessage = async (req, res) =>{
    try {
        const result = await pool.query("SELECT * FROM chats")
        res.json(result.rows)
        
    } catch (error) {
        console.error('error fetching chats', error)
        res.status(500).json({error: 'Failed fetching chats' })
    }
}

const getMessageByChatId = async (req, res) => {
  try{
    const result = await pool.query ("SELECT * FROM chats where chat_id = 3")
    res.json(result.rows)
  }catch(error){  
    console.error("Error fetching message", error)
    res.status(500).json({
      error: 'Failed fetching messages'
    })
  }
}

module.exports = { sendMessageToBot, getMessage, getMessageByChatId };
