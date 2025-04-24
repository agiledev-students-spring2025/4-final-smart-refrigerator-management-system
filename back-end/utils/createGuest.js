require('dotenv').config();
const mongoose   = require('mongoose');
const bcrypt     = require('bcrypt');
const User       = require('../models/User');
const seedItems  = require('./seedStarterItems');

(async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const email = 'guest@email.com';
  const pw    = 'GuestPassword';
  let guest   = await User.findOne({ email });

  if (!guest) {
    guest = await User.create({
      email,
      name:  'Guest User',
      password: await bcrypt.hash(pw, 10),
    });
    console.log('✅ guest account created');
  } else {
    console.log('ℹ️ guest account already exists');
  }

  // seed starter items **for that guest’s _id**
  await seedItems(guest._id);

  process.exit();
})();