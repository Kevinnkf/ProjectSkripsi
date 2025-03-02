const express = require('express');
const router = express.Router();
const chats = []; // In-memory storage for chat data

// POST route to create a new chat entry
router.post('/', (req, res) => {
    const { user_id, user_message, bot_response } = req.body;
    const chat_id = chats.length + 1; // Simple ID generation
    const chat_time = new Date().toISOString();

    const newChat = { chat_id, user_id, user_message, bot_response, chat_time };
    chats.push(newChat);
    res.status(201).json(newChat);
});

// GET route to retrieve chat history
router.get('/', (req, res) => {
    res.status(200).json(chats);
});

module.exports = router;
