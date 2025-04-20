const express = require('express');
const { sendFeedback, getFeedback } = require('../controller/feedback');

const router = express.Router();

// POST /feedback - submit feedback
router.get('/', getFeedback);
router.post('/post', sendFeedback);

module.exports = router;
