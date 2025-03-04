const express = require('express');
const { sendMessageToBot, getMessage, getMessageByChatId } = require('../controller/chats'); 

const router = express.Router();

router.get("/", getMessage)
router.post("/post", sendMessageToBot);
router.get("/get", getMessageByChatId)

module.exports = router;
