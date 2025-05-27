import express from 'express';
import { isAuthenticated } from '../middleware/auth.js';
import { registerAdmins, findAll, deleteById, login, searchAdmins, logout, resetPassword } from '../controller/admins.js';

const router = express.Router();

router.get('/', isAuthenticated, findAll);
router.post('/register', registerAdmins);
router.post('/login', login);
router.delete('/delete/:id', isAuthenticated, deleteById);
router.get('/:name', isAuthenticated, searchAdmins);
router.post('/logout', isAuthenticated, logout);
router.post('/reset-password', resetPassword)

export default router;

// router.get('/', getAdmins);
