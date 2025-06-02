import express from 'express';
import { isAuthenticated } from '../middleware/auth.js';
import { addFAQ, getFAQ, classifyFAQ, editFAQ, deleteFAQ } from '../controller/FAQ.js';

const router = express.Router();

router.get('/',  getFAQ);
router.post('/post', isAuthenticated, addFAQ);
router.put('/edit/:id', isAuthenticated, editFAQ);
router.delete('/delete/:id', isAuthenticated, deleteFAQ);
router.get('/classify', isAuthenticated, classifyFAQ);


export default router;
