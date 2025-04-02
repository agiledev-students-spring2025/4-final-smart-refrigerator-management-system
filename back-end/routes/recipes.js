const express = require('express');
const router = express.Router();
const mockRecipes = require('../mockData/recipes');  // Adjust the path based on your project structure

// Fetch all recipes
router.get('/', (req, res) => {
  res.json({
    status: 'success',
    data: mockRecipes
  });
});

// Fetch recipe by ID
// Fetch recipe by ID
router.get('/:id', (req, res) => {
  const recipeId = req.params.id;
  
  // Log the requested ID
  console.log('Requesting recipe with ID:', recipeId);
  
  const recipe = mockRecipes.find(recipe => recipe.id === recipeId);

  console.log("-------------------------------------------------------------------------------------");
  console.log(recipe);  // This will log the recipe found for the given ID
  
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


// Search recipes by name or ingredients
router.get('/recipes/search', (req, res) => {
  const { query } = req.query; // Extract the search query from the request
  if (!query) {
    return res.status(400).json({ status: 'error', message: 'Query parameter is required' });
  }

  // Filter recipes based on the search query
  const filteredRecipes = mockRecipes.filter(recipe => 
    recipe.name.toLowerCase().includes(query.toLowerCase()) ||  // Search by recipe name
    recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(query.toLowerCase())) // Search by ingredient
  );

  res.json({
    status: 'success',
    data: filteredRecipes
  });
});

/*
router.get('/recipes/search', (req, res) => {
  const { query } = req.query; // Extract the search query from the request
  if (!query) {
    return res.status(400).json({ status: 'error', message: 'Query parameter is required' });
  }

  // Filter recipes based on the search query
  const filteredRecipes = mockRecipes.filter(recipe =>
    recipe.name.toLowerCase().includes(query.toLowerCase())
  );

  res.json({
    status: 'success',
    data: filteredRecipes
  });
});*/

module.exports = router;
