import express from 'express';
import { sendMessageToBot, getMessageHistory, getChatsWithFeedback } from '../controller/chats.js';

const router = express.Router();

router.get('/',  getMessageHistory);
router.post('/post', sendMessageToBot);

router.get('/with-feedback', getChatsWithFeedback);

export default router;
