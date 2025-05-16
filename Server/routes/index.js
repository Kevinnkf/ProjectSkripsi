import express from 'express';

import authRoutes      from './auth.js';
import chatsRoutes     from './chats.js';
import feedbackRoutes  from './feedback.js';
import knowledgeRoutes from './baseKnowledge.js';
import adminsRoutes    from './admins.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

// public
router.use('/api/auth', authRoutes);
router.use('/api/chats', chatsRoutes);
router.use('/api/feedback', feedbackRoutes);

// protected
router.use('/api/knowledge', isAuthenticated, knowledgeRoutes);
router.use('/api/admins', adminsRoutes);

export default router;
