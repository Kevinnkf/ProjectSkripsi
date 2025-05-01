const express = require('express');
const { getBaseKnowledge, postBaseKnowledge, upload, searchBaseKnowledge } = require('../controller/baseKnowledge'); 

const router = express.Router();

router.get('/', getBaseKnowledge);
router.get('/:filename', searchBaseKnowledge)
router.post("/post", upload.single("content"), postBaseKnowledge);

module.exports = router;
