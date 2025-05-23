import express from 'express';
import { sendMessageToBot, getMessageHistory, getChatsWithFeedback, getQuestionsCountThisWeek, getAllChatHistory } from '../controller/chats.js';

const router = express.Router();

router.get('/',  getAllChatHistory);
router.get('/get',  getMessageHistory);
router.post('/post', sendMessageToBot);

router.get('/with-feedback', getChatsWithFeedback);
router.get('/count-this-week', getQuestionsCountThisWeek);

export default router;
