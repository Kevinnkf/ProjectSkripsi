import express from 'express';
import { sendMessageToBot, getMessageHistory, getChatsWithFeedback } from '../controller/chats.js';

const router = express.Router();

router.get('/',  getMessageHistoryByIp);
router.get('/get',  getAllChatHistory);
router.post('/post', sendMessageToBot);

router.get('/with-feedback', getChatsWithFeedback);

export default router;
