const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

// Fetch all recipes
router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json({
      status: 'success',
      data: recipes
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'Server error fetching recipes' });
  }
});

// Get recipe by ID
router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ status: 'error', message: 'Recipe not found' });
    }
    res.json({ status: 'success', data: recipe });
  } catch (err) {
    res.status(400).json({ status: 'error', message: 'Invalid recipe ID' });
  }
});

// Update recipe's favorite list (Add/remove user email)
// Update recipe's favorite list (Add/remove user email)
router.put('/:id', async (req, res) => {
  try {
    const { favoriteEmail } = req.body;  // The current user's email to be added or removed

    if (!favoriteEmail || typeof favoriteEmail !== 'string') {
      return res.status(400).json({ status: 'error', message: 'Invalid email address' });
    }

    // Fetch the recipe by ID
    const recipe = await Recipe.findById(req.params.id);
    
    if (!recipe) {
      console.warn("Recipe not found for ID:", req.params.id);
      return res.status(404).json({ status: 'error', message: 'Recipe not found' });
    }

    // Prevent duplicate emails in the favorite array
    let updatedFavoriteArray = [...recipe.favorite];  // Make a copy of the current favorite array

    // Check if the current user's email is already in the favorite array
    if (updatedFavoriteArray.includes(favoriteEmail)) {
      // If it exists, remove the email from the array
      updatedFavoriteArray = updatedFavoriteArray.filter(email => email !== favoriteEmail);
    } else {
      // If it doesn't exist, add the email to the array
      updatedFavoriteArray.push(favoriteEmail);
    }

    // Ensure the favorite array has only unique emails
    updatedFavoriteArray = [...new Set(updatedFavoriteArray)];

    // Save the updated recipe with the modified favorite list
    recipe.favorite = updatedFavoriteArray;
    await recipe.save();

    console.log("Recipe saved successfully with updated favorites:", recipe.favorite);

    // Send the updated recipe data back to the client
    res.json({ status: 'success', data: recipe }); // Make sure `recipe.favorite` is updated here
  } catch (err) {
    console.error("Error in PUT /recipes/:id", err);
    res.status(500).json({ status: 'error', message: err.message });
  }
});

/*router.put('/:id', async (req, res) => {
  try {
    const { favoriteEmail } = req.body;  // The current user's email to be added or removed

    if (!favoriteEmail || typeof favoriteEmail !== 'string') {
      return res.status(400).json({ status: 'error', message: 'Invalid email address' });
    }

    // Fetch the recipe by ID
    const recipe = await Recipe.findById(req.params.id);
    
    if (!recipe) {
      console.warn("Recipe not found for ID:", req.params.id);
      return res.status(404).json({ status: 'error', message: 'Recipe not found' });
    }

    // Prevent duplicate emails in the favorite array
    let updatedFavoriteArray = [...recipe.favorite];  // Make a copy of the current favorite array

    // Check if the current user's email is already in the favorite array
    if (updatedFavoriteArray.includes(favoriteEmail)) {
      // If it exists, remove the email from the array
      updatedFavoriteArray = updatedFavoriteArray.filter(email => email !== favoriteEmail);
    } else {
      // If it doesn't exist, add the email to the array
      updatedFavoriteArray.push(favoriteEmail);
    }

    // Ensure the favorite array has only unique emails
    updatedFavoriteArray = [...new Set(updatedFavoriteArray)];

    // Save the updated recipe with the modified favorite list
    recipe.favorite = updatedFavoriteArray;
    await recipe.save();

    console.log("Recipe saved successfully with updated favorites:", recipe.favorite);

    // Send the updated recipe data back to the client
    res.json({ status: 'success', data: recipe });
  } catch (err) {
    console.error("Error in PUT /recipes/:id", err);
    res.status(500).json({ status: 'error', message: err.message });
  }
});*/


module.exports = router;
