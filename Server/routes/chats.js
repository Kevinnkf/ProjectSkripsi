import express from 'express';
import { sendMessageToBot, getMessageHistory, getChatsWithFeedback, getQuestionsCountThisWeek } from '../controller/chats.js';

const router = express.Router();

router.get('/get',  getMessageHistory);
router.post('/post', sendMessageToBot);

router.get('/with-feedback', getChatsWithFeedback);
router.get('/count-this-week', getQuestionsCountThisWeek);

export default router;
