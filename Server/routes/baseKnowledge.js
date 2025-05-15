import express from 'express';
import { getBaseKnowledge, postBaseKnowledge, upload, searchBaseKnowledge } from '../controller/baseKnowledge.js';

const router = express.Router();

router.get('/', getBaseKnowledge);
router.get('/:filename', searchBaseKnowledge);
router.post('/post', upload.single('content'), postBaseKnowledge);

export default router;
