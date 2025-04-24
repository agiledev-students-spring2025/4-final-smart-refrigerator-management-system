// scripts/createGuest.js  (run once)
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/User');

(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  const email = 'guest@email.com';
  const pw    = 'GuestPassword';

  if (!(await User.findOne({ email }))) {
    const hashed = await bcrypt.hash(pw, 10);
    await User.create({ email, password: hashed, name: 'Guest User' });
    console.log('✅ guest account created');
  } else {
    console.log('ℹ️ guest account already exists');
  }
  process.exit();
})();
