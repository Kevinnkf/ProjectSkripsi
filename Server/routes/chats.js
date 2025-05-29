import express from 'express';
import { isAuthenticated } from '../middleware/auth.js';
import { sendMessageToBot, getMessageHistory, getChatsWithFeedback, getQuestionsCountThisWeek, getAllChatHistory } from '../controller/chats.js';

const router = express.Router();

router.get('/', getAllChatHistory);
router.get('/get', isAuthenticated, getMessageHistory);
router.post('/post', sendMessageToBot);

router.get('/with-feedback', isAuthenticated, getChatsWithFeedback);
router.get('/count-this-week', isAuthenticated, getQuestionsCountThisWeek);

export default router;
