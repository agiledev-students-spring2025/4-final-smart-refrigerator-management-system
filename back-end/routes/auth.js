const mockUsers = [
  {
    email: 'john@example.com',
    password: '12345',
    name: 'John White'
  }
];

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
  const user = mockUsers.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  res.status(200).json({
    message: 'Login successful',
    user: {
      email: user.email,
      name: user.name
    }
  });  
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

  const existingUser = mockUsers.find(user => user.email === email);
  if (existingUser) {
    return res.status(409).json({ error: 'Email already registered' });
  }
  
  const newUser = { email, password, name };
  mockUsers.push(newUser);
  
  res.status(201).json({
    message: 'Signup successful',
    user: {
      email: newUser.email,
      name: newUser.name
    }
  });
  
});
  
/**
 * @route   POST /api/logout
 * @desc    Mock logout route
 * @access  Public
 */
router.post('/logout', (req, res) => {
  console.log("Logout request received");
  // In a real app: clear session or token here
  res.status(200).json({ message: 'Logout successful' });
});


module.exports = router;
