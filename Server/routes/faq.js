import express from 'express';
import { addFAQ, getFAQ } from '../controller/FAQ.js';

const router = express.Router();

router.get('/',  getFAQ);
router.post('/post', addFAQ);

export default router;
