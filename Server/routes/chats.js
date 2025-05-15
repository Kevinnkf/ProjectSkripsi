import express from 'express';
import { sendMessageToBot, getMessageHistory } from '../controller/chats.js';

const router = express.Router();

router.get('/', getMessageHistory);
router.post('/post', sendMessageToBot);

export default router;
