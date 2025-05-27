import express from 'express';
import { isAuthenticated } from '../middleware/auth.js';
import { addFAQ, getFAQ, classifyFAQ } from '../controller/FAQ.js';

const router = express.Router();

router.get('/',  getFAQ);
router.post('/post', isAuthenticated, addFAQ);
router.get('/classify', isAuthenticated, classifyFAQ);


export default router;
