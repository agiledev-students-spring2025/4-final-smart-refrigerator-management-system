const express = require('express');
const router = express.Router();

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
  

module.exports = router;