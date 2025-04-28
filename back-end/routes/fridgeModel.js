const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const User = require('../models/User');

  /**
   * @route   POST /Fridge-Model
   * @desc    Update fridge model settings
   * @access  Public
   */
  router.post("/Fridge-Model", verifyToken, async (req, res) => {
    try {
      const { fridgeBrand, modelName, Features} = req.body.value;
      if (!fridgeBrand || !modelName) {
        return res.status(400).json({ error: "Brand and model are required" });
      }
      
      const user = await User.findByIdAndUpdate(
        req.user.userId,{
          fridgeModel: {
            fridgeBrand,
            modelName,
            Features,
          },
        },
        {new : true}
      );
      res.status(200).json({ message: 'Fridge model updated', user });
      
    } catch (error) {
      console.error("Error updating fridge settings:", error);
      res.status(500).json({ error: "Server error while updating fridge data" });
    }
  });
  

module.exports = router;