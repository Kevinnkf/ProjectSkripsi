import express from 'express';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

router.post('/isAuthenticated', isAuthenticated);

export default router;
