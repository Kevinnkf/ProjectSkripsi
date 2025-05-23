import express from 'express';
import { addFAQ, getFAQ, classifyFAQ } from '../controller/FAQ.js';

const router = express.Router();

router.get('/',  getFAQ);
router.post('/post', addFAQ);
router.get('/classify', classifyFAQ);


export default router;
