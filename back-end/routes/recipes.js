const express = require('express');
const router = express.Router();
const mockRecipes = require('../mockData/recipes');  // Adjust the path based on your project structure

// Fetch all recipes
router.get('/recipes', (req, res) => {
  res.json({
    status: 'success',
    data: mockRecipes
  });
});

// Fetch recipe by ID
router.get('/recipes/:id', (req, res) => {
  const recipe = mockRecipes.find(recipe => recipe.id === req.params.id);
  
  if (!recipe) {
    return res.status(404).json({
      status: 'error',
      message: 'Recipe not found'
    });
  }
  
  res.json({
    status: 'success',
    data: recipe
  });
});

module.exports = router;
