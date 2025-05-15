import express from 'express';
import { isAuthenticated } from '../middleware/auth.js';
import { registerAdmins, findAll, deleteById, login, searchAdmins, logout } from '../controller/admins.js';

const router = express.Router();

router.get('/', isAuthenticated, findAll);
router.post('/register', isAuthenticated, registerAdmins);
router.post('/login', login);
router.delete('/delete', isAuthenticated, deleteById);
router.get('/:name', isAuthenticated, searchAdmins);
router.post('/logout', isAuthenticated, logout);

export default router;

// router.get('/', getAdmins);
