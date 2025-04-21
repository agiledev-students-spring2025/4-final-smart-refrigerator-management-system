const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

// Fetch all recipes
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


// Fetch recipe by ID
router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

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
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: 'Invalid recipe ID'
    });
  }
});


// Search recipes by name or ingredient
router.get('/recipes/search', async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ status: 'error', message: 'Query parameter is required' });
  }

  try {
    const recipes = await Recipe.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { 'ingredients.name': { $regex: query, $options: 'i' } }
      ]
    });

    res.json({
      status: 'success',
      data: recipes
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'Server error during search' });
  }
});

module.exports = router;
