const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

router.get('/starter', async (req, res) => {
  try {
    const starterItems = await Item.find({ isStarterItem: true });
    res.json({ status: 'success', data: starterItems });
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'Failed to fetch starter items' });
  }
});

module.exports = router;
