const express = require('express');
const router = express.Router();

/**
 * @route   POST /api/login
 * @desc    Mock login route
 * @access  Public
 */
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt:", req.body); // 🐞 See what the server receives

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


/**
 * @route   POST /api/signup
 * @desc    Mock signup route
 * @access  Public
 */
router.post('/signup', (req, res) => {
    const { email, password, name } = req.body;
    console.log("Signup data received:", req.body); // 🐞 See what the server receives
  
    // Input validation
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  
    // Simulate saving to DB (not really saving for now)
    const newUser = {
      email,
      password,
      name,
      preferences: {},
      fridgeModel: 'FridgePro-2025',
      usageHistory: []
    };
  
    res.status(201).json({
      message: 'Signup successful',
      user: {
        email: newUser.email,
        name: newUser.name
      }
    });
  });
  

module.exports = router;
