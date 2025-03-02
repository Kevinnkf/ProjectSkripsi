const express = require('express');
const { getBaseKnowledge, postBaseKnowledge, upload } = require('../controller/baseKnowledge'); 

const router = express.Router();

router.get('/', getBaseKnowledge);
router.post("/post", upload.single("content"), postBaseKnowledge);

module.exports = router;
