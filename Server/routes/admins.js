const express = require('express');
const { getAdmins, registerAdmins } = require('../controller/admins'); 

const router = express.Router();

router.get('/', getAdmins);
router.post('/register', registerAdmins);

module.exports = router;
