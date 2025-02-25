const express = require('express');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// Example route
router.post('/login',
  [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.json({ message: 'Login successful!' });
  }
);

// ✅ Correct export
module.exports = router;
