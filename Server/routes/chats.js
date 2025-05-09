const express = require('express');
const { sendMessageToBot, getMessageHistory } = require('../controller/chats'); 

const router = express.Router();

router.get("/", getMessageHistory)
router.post("/post", sendMessageToBot);

module.exports = router;
