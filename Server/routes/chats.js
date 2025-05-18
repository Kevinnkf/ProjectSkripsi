import express from 'express';
import { sendMessageToBot, getMessageHistoryByIp, getAllChatHistory } from '../controller/chats.js';

const router = express.Router();

router.get('/',  getMessageHistoryByIp);
router.get('/get',  getAllChatHistory);
router.post('/post', sendMessageToBot);

export default router;
