const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/authMiddleware');
const Item = require('../models/Item');

/**
 * @route   GET /api/items
 * @desc    Get all items for the logged-in user
 * @access  Private
 */
router.get('/', auth, async (req, res) => {
  try {
    const items = await Item.find({ owner: req.user.userId }).sort({ expirationDate: 1 });
    res.json({
      status: 'success',
      data: items
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      status: 'error',
      message: 'Server Error'
    });
  }
});

/**
 * @route   GET /api/items/:id
 * @desc    Get item by ID
 * @access  Private
 */
router.get('/:id', auth, async (req, res) => {
  try {
    const item = mockItems.find(item => item.id === req.params.id);
  
    if (!item) {
      return res.status(404).json({
        status: 'error',
        message: 'Item not found'
      });
    }
    
    if (item.owner.toString() !== req.user.userId) {
      return res.status(401).json({
        status: 'error',
        message: 'User not authorized'
      });
    }

    res.json({
      status: 'success',
      data: item
    });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        status: 'error',
        message: 'Item not found'
      });
    }
    res.status(500).json({
      status: 'error',
      message: 'Server Error'
    });
  }
});

/**
 * @route   POST /api/items
 * @desc    Add new item to inventory
 * @access  Private
 */
router.post('/', [
  auth,
  [
    check('name', 'Name is required').not().isEmpty(),
    check('category', 'Category is required').not().isEmpty(),
    check('expirationDate', 'Expiration date is required').not().isEmpty(),
  ]
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      errors: errors.array()
    });
  }
  
  const {
    name,
    category,
    quantity,
    expirationDate,
    purchaseDate,
    storageLocation,
    notes,
    imageUrl
  } = req.body;
  
  try {
    const newItem = new Item({
      name,
      category,
      quantity: quantity || '1 item',
      expirationDate,
      purchaseDate: purchaseDate || Date.now(),
      storageLocation: storageLocation || 'main',
      notes,
      imageUrl: imageUrl || `https://picsum.photos/seed/${Date.now()}/200/300`,
      owner: req.user.userId
    });
    
    const item = await newItem.save();
  
    res.status(201).json({
      status: 'success',
      message: 'Item added successfully',
      data: item
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      status: 'error',
      message: 'Server Error'
    });
  }
});

/**
 * @route   PUT /api/items/:id
 * @desc    Update inventory item
 * @access  Private
 */
router.put('/:id', auth, async (req, res) => {
  const {
    name,
    category,
    quantity,
    expirationDate,
    purchaseDate,
    storageLocation,
    notes,
    imageUrl
  } = req.body;
  
  const itemFields = {};
  if (name) itemFields.name = name;
  if (category) itemFields.category = category;
  if (quantity) itemFields.quantity = quantity;
  if (expirationDate) itemFields.expirationDate = expirationDate;
  if (purchaseDate) itemFields.purchaseDate = purchaseDate;
  if (storageLocation) itemFields.storageLocation = storageLocation;
  if (notes) itemFields.notes = notes;
  if (imageUrl) itemFields.imageUrl = imageUrl;
  
  try {
    let item = await Item.findById(req.params.id);
    
    if (!item) {
      return res.status(404).json({
        status: 'error',
        message: 'Item not found'
      });
    }
    
    if (item.owner.toString() !== req.user.userId) {
      return res.status(401).json({
        status: 'error',
        message: 'User not authorized'
      });
    }
    
    item = await Item.findByIdAndUpdate(
      req.params.id,
      { $set: itemFields },
      { new: true }
    );
    
    res.json({
      status: 'success',
      message: 'Item updated successfully',
      data: item
    });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        status: 'error',
        message: 'Item not found'
      });
    }
    res.status(500).json({
      status: 'error',
      message: 'Server Error'
    });
  }
});

/**
 * @route   DELETE /api/items/:id
 * @desc    Delete inventory item
 * @access  Private
 */
router.delete('/:id', auth, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
  
    if (!item) {
      return res.status(404).json({
        status: 'error',
        message: 'Item not found'
      });
    }

    if (item.owner.toString() !== req.user.userId) {
      return res.status(401).json({
        status: 'error',
        message: 'User not authorized'
      });
    }

    await Item.findByIdAndDelete(req.params.id);
  
    res.json({
      status: 'success',
      message: 'Item deleted successfully'
    });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        status: 'error',
        message: 'Item not found'
      });
    }
    res.status(500).json({
      status: 'error',
      message: 'Server Error'
    });
  }
});

/**
 * @route   GET /api/items/expiring/soon
 * @desc    Get items expiring within 7 days
 * @access  Private
 */
router.get('/expiring/soon', async (req, res) => {
  try {
    const today = new Date();
    const oneWeekLater = new Date(today);
    oneWeekLater.setDate(today.getDate() + 7);
    
    const expiringSoon = await Item.find({
      owner: req.user.userId,
      expirationDate: { $gte: today, $lte: oneWeekLater }
    }).sort({ expirationDate: 1 });
    
    res.json({
      status: 'success',
      data: expiringSoon
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      status: 'error',
      message: 'Server Error'
    });
  }
});

/**
 * @route   GET /api/items/category/:category
 * @desc    Get items by category
 * @access  Private
 */
router.get('/category/:category', auth, async (req, res) => {
  try {
    const { category } = req.params;
    const items = await Item.find({
      owner: req.user.userId,
      category: { $regex: new RegExp(category, 'i') }
    }).sort({ expirationDate: 1 });
  
    res.json({
      status: 'success',
      data: items
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      status: 'error',
      message: 'Server Error'
    });
  }
});

/**
 * @route   GET /api/items/location/:location
 * @desc    Get items by storage location
 * @access  Private
 */
router.get('/location/:location', auth, async (req, res) => {
  try {
    const { location } = req.params;
    const items = await Item.find({
      owner: req.user.userId,
      storageLocation: { $regex: new RegExp(location, 'i') }
    }).sort({ expirationDate: 1 });
  
    res.json({
      status: 'success',
      data: items
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      status: 'error',
      message: 'Server Error'
    });
  }
});

/**
 * @route   POST /api/items/scan
 * @desc    Process a scanned item (receipt or product)
 * @access  Private
 */
router.post('/scan', auth, async (req, res) => {
  try {
    // TODO: Add AI image processing logic here in the future
    const newItem = new Item({
      name: req.body.name || 'Scanned Item',
      category: req.body.category || 'Unknown',
      expirationDate: req.body.expirationDate || new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      quantity: req.body.quantity || '1 item',
      storageLocation: req.body.storageLocation || 'Main shelf',
      imageUrl: `https://picsum.photos/seed/${Date.now()}/200/300`,
      owner: req.user.userId
    });

    const item = await newItem.save();
    
    res.status(201).json({
      status: 'success',
      message: 'Item scanned and added successfully',
      data: item
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      status: 'error',
      message: 'Server Error'
    });
  }
});

// add frequent items endpoint
router.get('/frequent', (req, res) => {
  const frequentItems = [
    { id: 'f1', name: 'Eggs', quantity: '12 count', frequency: 'weekly', category: 'Dairy' },
    { id: 'f2', name: 'Milk', quantity: '1 gallon', frequency: 'weekly', category: 'Dairy' },
    { id: 'f3', name: 'Bread', quantity: '1 loaf', frequency: 'weekly', category: 'Bakery' }
  ];
  
  res.json({
    status: 'success',
    data: frequentItems
  });
});

// add starter/common items endpoint
router.get('/starter', (req, res) => {
  const starterItems = [
    { id: 's1', name: 'Salt', category: 'Pantry', nonExpiring: true },
    { id: 's2', name: 'Sugar', category: 'Pantry', nonExpiring: true },
    { id: 's3', name: 'Flour', category: 'Pantry', expiresIn: '12 months' },
    { id: 's4', name: 'Rice', category: 'Pantry', expiresIn: '24 months' },
    { id: 's5', name: 'Olive Oil', category: 'Pantry', expiresIn: '24 months' }
  ];
  
  res.json({
    status: 'success',
    data: starterItems
  });
});

router.post('/quick-add', (req, res) => {
  const { itemId, quantity } = req.body;
  res.status(200).json({
    status: 'success',
    message: 'Item quickly added to inventory',
    data: {
      id: itemId,
      quantity: quantity,
      dateAdded: new Date().toISOString().split('T')[0]
    }
  });
});

module.exports = router;