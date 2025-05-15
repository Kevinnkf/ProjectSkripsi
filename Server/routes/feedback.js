import express from 'express';
import { sendFeedback, getFeedback } from '../controller/feedback.js';

const router = express.Router();

router.get('/', getFeedback);
router.post('/post', sendFeedback);

export default router;
