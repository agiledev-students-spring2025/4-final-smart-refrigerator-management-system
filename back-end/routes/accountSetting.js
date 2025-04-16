const express = require('express');
const router = express.Router();
const User = require("../models/User");
const verifyToken = require('../middleware/authMiddleware');
const bcrypt = require('bcrypt');

/**
 * @route   GET /Account-Setting/:field
 * @desc    Get the field of the account setting
 * @access  Public
 */
router.get("/Account-Setting/:field", async (req, res) => {
    try {
      const { field } = req.params;
      
      // Define allowed fields
      const allowedFields = ["name", "email", "phone"];
      
      if (!allowedFields.includes(field)) {
        return res.status(400).json({ error: "Invalid field" });
      }
      
       const user = await User.findOne({ userEmail });
       if(!user){
        return res.status(404).json({ error: 'User not found' });
       }
      
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
 * @desc    Update the field of the account setting
 * @access  Public
 */

const { body, validationResult } = require('express-validator');

const validateField = (field) => {
  switch (field) {
    case 'email':
      return [body('value').isEmail().withMessage('Please enter a valid email')];
    case 'name':
      return [body('value').notEmpty().withMessage('Name is required')];
    case 'phone':
      return [body('value').isMobilePhone().withMessage('Please enter a valid phone number')];
    default:
      return [];
  }
};


router.post("/Account-Setting/:field", 
  (req, res, next) => {
  const validators = validateField(req.params.field);
  return Promise.all(validators.map(validation => validation.run(req)))
    .then(() => next());
  }, 
  verifyToken, async (req,res)=> {
    const { field } = req.params;
    let { value } = req.body;

    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({ error: errors.array()[0].msg });
    }
    try{

      if(field === 'password'){
        value = await bcrypt.hash(value, 10);
      }

      const updatedUser = await User.findByIdAndUpdate(
        req.user.userId,                            // from the verified token
        { [field]: value },                         // dynamically update one field
        { new: true, runValidators: true }          // return updated doc
      ).select("name email phone");

      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }
  
      res.json({ [field]: updatedUser[field] });
    }
    catch (error) {
      console.error("Error updating user field:", error);
      res.status(500).json({ error: "Server error while updating user data" });
    }
  })

module.exports = router;