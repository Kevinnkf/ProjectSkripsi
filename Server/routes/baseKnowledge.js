import express from 'express';
// import { isAuthenticated } from '../middleware/auth.js';
import { getBaseKnowledge, postBaseKnowledge, upload, searchBaseKnowledge } from '../controller/baseKnowledge.js';

const router = express.Router();

router.get('/', getBaseKnowledge);
router.get('/:filename', searchBaseKnowledge);
router.post('/post', upload.single('file'), postBaseKnowledge);

export default router;
