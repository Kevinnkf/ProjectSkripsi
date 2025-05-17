import express from 'express';
import { isAuthenticated } from '../middleware/auth.js';
import { getBaseKnowledge, postBaseKnowledge, upload, searchBaseKnowledge } from '../controller/baseKnowledge.js';

const router = express.Router();

router.get('/', isAuthenticated, getBaseKnowledge);
router.get('/:filename', isAuthenticated, searchBaseKnowledge);
router.post('/post', isAuthenticated, upload.single('file'), postBaseKnowledge);

export default router;
