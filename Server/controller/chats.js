const pool = require('../config/db'); // Ensure this is the correct path to your DB config
const { OpenAI } = require("openai");
require("dotenv").config();

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

    // Correct SQL Query with proper placeholders
    const result = await pool.query(
      'INSERT INTO chats ("id_user", "user_message", "bot_response", "chat_time") VALUES ($1, $2, $3, NOW())',
      [user_id, message, botResponse]
    );

    res.json({
       botReply: botResponse
      });
  } catch (error) {
    console.error("Error getting bot response:", error);
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
