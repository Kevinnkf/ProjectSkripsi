const express = require('express');
const { getAdmins } = require('../controller/admins'); 

const router = express.Router();

router.get('/', getAdmins);

module.exports = router;
