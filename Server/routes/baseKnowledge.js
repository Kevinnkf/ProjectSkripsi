const express = require('express');
const { getKnowledge } = require('../controller/baseKnowledge'); 

const router = express.Router();

router.get('/', getAdmins);

module.exports = router;
