const express = require('express');

const adminsRoutes = require('./admins');
const knowledgeRoutes = require('./baseKnowledge');
const authRoutes = require('./auth');
const chatRoutes = require('./chats');
const feedbackRoutes = require('./feedback')

const router = express.Router();

router.use('/api/chats', chatRoutes);
router.use('/api/knowledge', knowledgeRoutes);
router.use('/api/admins', adminsRoutes);
router.use('/api/auth', authRoutes);
router.use('/api/feedback', feedbackRoutes)

module.exports = router;