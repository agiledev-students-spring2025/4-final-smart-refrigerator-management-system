const express = require('express');
const router = express.Router();

/**
 * @route   POST /api/login
 * @desc    Mock login route
 * @access  Public
 */
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Mock user
  const mockUser = {
    email: 'john@example.com',
    password: '1234567890'
  };

  if (email === mockUser.email && password === mockUser.password) {
    res.status(200).json({
      message: 'Login successful',
      user: { email: mockUser.email }
    });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

module.exports = router;
