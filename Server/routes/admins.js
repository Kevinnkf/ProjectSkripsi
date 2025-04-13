const express = require('express');
const {registerAdmins, findAll, deleteById, login } = require('../controller/admins'); 

const router = express.Router();

router.get('/', findAll);
router.post('/register', registerAdmins);
router.post('/login', login)
router.delete('/delete', deleteById);

module.exports = router;

// router.get('/', getAdmins);