const express = require('express');
const {registerAdmins, findAll } = require('../controller/admins'); 

const router = express.Router();

router.get('/', findAll);
router.post('/register', registerAdmins);

module.exports = router;

// router.get('/', getAdmins);