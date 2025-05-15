import express from 'express';

import adminsRoutes from './admins.js';
import knowledgeRoutes from './baseKnowledge.js';
import authRoutes from './auth.js';
import chatRoutes from './chats.js';
import feedbackRoutes from './feedback.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

router.use('/api/auth', authRoutes);
router.use('/api/chats', chatRoutes);
router.use('/api/feedback', feedbackRoutes);
router.use('/api/knowledge', isAuthenticated, knowledgeRoutes);
router.use('/api/admins', adminsRoutes);

export default router;
