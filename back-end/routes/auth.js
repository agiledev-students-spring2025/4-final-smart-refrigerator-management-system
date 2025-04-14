const mockUsers = [
  {
    email: 'john@example.com',
    password: '12345',
    name: 'John White'
  }
];

const express = require('express');
const router = express.Router();
const User = require('../models/User');

/**
 * @route   POST /api/login
 * @desc    Mock login route
 * @access  Public
 */
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  // console.log("Login attempt:", req.body); // 🐞 See what the server receives

  try{
    const user = await User.findOne({email});

    if(!user || user.password !== password){
      return res.status(401).json({ error: 'Invalid credentials' });
    }

  res.status(200).json({
    message: 'Login successful',
    user: {
      email: user.email,
      name: user.name
    }
  });
  }
  catch(err) {
    console.error("Login error:", err);
    res.status(500).json({error:'server error during login'})
  }

});


/**
 * @route   POST /api/signup
 * @desc    Mock signup route
 * @access  Public
 */
router.post('/signup', async (req, res) => {
  const { email, password, name } = req.body;
  // console.log("Signup data received:", req.body); // 🐞 See what the server receives

  // Input validation
  if (!email || !password || !name) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  try{
    const existingUser = await User.findOne({email});
    if (existingUser) {
      return res.status(409).json({ error: 'Email already registered' });
    }
  
  
  const newUser = new User({ email, password, name });
  await newUser.save();
  
  res.status(201).json({
    message: 'Signup successful',
    user: {
      email: newUser.email,
      name: newUser.name
    }
  });
}
  catch (error){
    console.error("Error during signup:", error);
    res.status(500).json({ error: 'Server error during signup' });
  }
});
  
/**
 * @route   POST /api/logout
 * @desc    Mock logout route
 * @access  Public
 */
router.post('/logout', (req, res) => {
  // console.log("Logout request received");
  // In a real app: clear session or token here
  res.status(200).json({ message: 'Logout successful' });
});


module.exports = router;
