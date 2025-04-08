const express = require('express');
const {registerAdmins, findAll, deleteById } = require('../controller/admins'); 

const router = express.Router();

router.get('/', findAll);
router.post('/register', registerAdmins);
router.delete('/delete', deleteById);

module.exports = router;

// router.get('/', getAdmins);