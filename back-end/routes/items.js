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

/**
 * @route   GET /Account-Setting/:field
 * @desc    Get the field of the account setting
 * @access  Public
 */
router.get("/Account-Setting/:field", (req, res) => {
  try {
    const { field } = req.params;
    
    // Define allowed fields
    const allowedFields = ["name", "email", "phone"];
    
    if (!allowedFields.includes(field)) {
      return res.status(400).json({ error: "Invalid field" });
    }
    
    //for database
    // const user = await User.findById(req.user.id);
    
    // Mock data for example
    const userSettings = {
      name: "John Doe",
      email: "john@example.com",
      phone: "1234567890",
    };
    
    // Check if the field exists for this user
    if (userSettings[field] === undefined) {
      return res.status(404).json({ error: `${field} not found` });
    }
    
    // Return just the requested field
    res.json({ [field]: userSettings[field] });
    
  } catch (error) {
    console.error(`Error fetching ${req.params.field}:`, error);
    res.status(500).json({ error: "Server error while fetching user data" });
  }
});

/**
 * @route   GET /Fridge-Model
 * @desc    Get all fridge model settings
 * @access  Public
 */
router.get("/Fridge-Model", (req, res) => {
  console.log("🔵 Fridge-Model route was hit!");
  try {
    // Mock data for example
    const fridgeSettings = {
      brand: "Samsung",
      model: "S29",
      features: {
        humidity: true,
        freezer: true,
        vegetableDrawer: false
      }
    };
    
    res.json(fridgeSettings);
    
  } catch (error) {
    console.error("Error fetching fridge settings:", error);
    res.status(500).json({ error: "Server error while fetching fridge data" });
  }
});

/**
 * @route   POST /Fridge-Model
 * @desc    Update fridge model settings
 * @access  Public
 */
router.post("/Fridge-Model", (req, res) => {
  try {
    const { brand, model, features } = req.body;
    
    // Validate required fields
    if (!brand || !model) {
      return res.status(400).json({ error: "Brand and model are required" });
    }
    
    // Here you would typically save to database
    // For now, just return the received data as confirmation
    res.json({
      brand,
      model,
      features: features || {}
    });
    
  } catch (error) {
    console.error("Error updating fridge settings:", error);
    res.status(500).json({ error: "Server error while updating fridge data" });
  }
});


/**
 * @route   POST /Account-Setting/:field
 * @desc    Get the field of the account setting
 * @access  Public
 */
router.post("/Account-Setting/:field", (req,res)=> {
  try{
    const { field } = req.params;
    const { value } = req.body;

    res.json({ [field]: value });
  }
  catch (error) {
    console.error("Error updating user field:", error);
    res.status(500).json({ error: "Server error while updating user data" });
  }
})

module.exports = router;