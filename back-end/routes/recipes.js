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


router.get('/search', async (req, res) => {
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

    res.json({ status: 'success', data: recipes });
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'Server error during search' });
  }
});

// This must come AFTER more specific routes
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

router.put('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      { favorite: req.body.favorite },
      { new: true }
    );

    if (!recipe) {
      console.warn("Recipe not found for ID:", req.params.id);
      return res.status(404).json({ status: 'error', message: 'Recipe not found' });
    }

    res.json({ status: 'success', data: recipe });
  } catch (err) {
    console.error("Error in PUT /recipes/:id", err);
    res.status(500).json({ status: 'error', message: err.message });
  }
});


module.exports = router;
