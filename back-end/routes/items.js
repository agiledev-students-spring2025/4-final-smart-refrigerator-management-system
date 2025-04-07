const express = require('express');
const router = express.Router();
const mockItems = require('../mockData/items');

/**
 * @route   GET /api/items
 * @desc    Get all inventory items
 * @access  Public
 */
router.get('/', (req, res) => {
  res.json({
    status: 'success',
    data: mockItems
  });
});

/**
 * @route   GET /api/items/:id
 * @desc    Get item by ID
 * @access  Public
 */
router.get('/:id', (req, res) => {
  const item = mockItems.find(item => item.id === req.params.id);
  
  if (!item) {
    return res.status(404).json({
      status: 'error',
      message: 'Item not found'
    });
  }
  
  res.json({
    status: 'success',
    data: item
  });
});

/**
 * @route   POST /api/items
 * @desc    Add new item to inventory
 * @access  Public
 */
router.post('/', (req, res) => {
  const newItem = {
    id: (mockItems.length + 1).toString(),
    ...req.body,
    dateAdded: new Date().toISOString().split('T')[0]
  };
  
  // mock return
  // TODO: add this to the database
  
  res.status(201).json({
    status: 'success',
    message: 'Item added successfully',
    data: newItem
  });
});

/**
 * @route   PUT /api/items/:id
 * @desc    Update inventory item
 * @access  Public
 */
router.put('/:id', (req, res) => {
  const item = mockItems.find(item => item.id === req.params.id);
  
  if (!item) {
    return res.status(404).json({
      status: 'error',
      message: 'Item not found'
    });
  }
  
  // mock updated item
  // TODO: add code for real udpate in databse
  
  const updatedItem = {
    ...item,
    ...req.body
  };
  
  res.json({
    status: 'success',
    message: 'Item updated successfully',
    data: updatedItem
  });
});

/**
 * @route   DELETE /api/items/:id
 * @desc    Delete inventory item
 * @access  Public
 */
router.delete('/:id', (req, res) => {
  const item = mockItems.find(item => item.id === req.params.id);
  
  if (!item) {
    return res.status(404).json({
      status: 'error',
      message: 'Item not found'
    });
  }
  
  // mock removal
  // TODO: add code for real deletion from the databse
  
  res.json({
    status: 'success',
    message: 'Item deleted successfully'
  });
});

/**
 * @route   GET /api/items/expiring/soon
 * @desc    Get items expiring within 7 days
 * @access  Public
 */
router.get('/expiring/soon', (req, res) => {
  const today = new Date();
  const oneWeekLater = new Date(today);
  oneWeekLater.setDate(today.getDate() + 7);
  
  const expiringSoon = mockItems.filter(item => {
    const expDate = new Date(item.expirationDate);
    return expDate >= today && expDate <= oneWeekLater;
  });
  
  res.json({
    status: 'success',
    data: expiringSoon
  });
});

/**
 * @route   GET /api/items/category/:category
 * @desc    Get items by category
 * @access  Public
 */
router.get('/category/:category', (req, res) => {
  const { category } = req.params;
  const items = mockItems.filter(item => 
    item.category.toLowerCase() === category.toLowerCase()
  );
  
  res.json({
    status: 'success',
    data: items
  });
});

/**
 * @route   GET /api/items/location/:location
 * @desc    Get items by storage location
 * @access  Public
 */
router.get('/location/:location', (req, res) => {
  const { location } = req.params;
  const items = mockItems.filter(item => 
    item.storageLocation.toLowerCase().includes(location.toLowerCase())
  );
  
  res.json({
    status: 'success',
    data: items
  });
});

/**
 * @route   POST /api/items/scan
 * @desc    Process a scanned item (receipt or product)
 * @access  Public
 */
router.post('/scan', (req, res) => {

  // mock scanning
  // TODO: add code for image processing and use AI to identify items
  
  const scannedItem = {
    id: (mockItems.length + 1).toString(),
    name: req.body.name || 'Scanned Item',
    category: req.body.category || 'Unknown',
    expirationDate: req.body.expirationDate || new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    quantity: req.body.quantity || '1 item',
    storageLocation: req.body.storageLocation || 'Main shelf',
    dateAdded: new Date().toISOString().split('T')[0],
    imageUrl: 'https://picsum.photos/200/300'
  };
  
  res.status(201).json({
    status: 'success',
    message: 'Item scanned and added successfully',
    data: scannedItem
  });
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