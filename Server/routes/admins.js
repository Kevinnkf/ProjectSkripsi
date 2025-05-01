const express = require('express');
const {registerAdmins, findAll, deleteById, login, searchAdmins } = require('../controller/admins'); 

const router = express.Router();

router.get('/', findAll);
router.post('/register', registerAdmins);
router.post('/login', login)
router.delete('/delete', deleteById);
router.get('/:name', searchAdmins)

module.exports = router;

// router.get('/', getAdmins);