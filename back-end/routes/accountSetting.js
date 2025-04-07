const express = require('express');
const router = express.Router();

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