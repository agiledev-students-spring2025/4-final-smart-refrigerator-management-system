// utils/seedRecipes.js
const fs = require('fs');
const path = require('path');
const Recipe = require('../models/Recipe');

const seedFilePath = path.join(__dirname, '../prepopulated_Data/seed_recipe.json');
const recipeData = JSON.parse(fs.readFileSync(seedFilePath, 'utf-8'));

const seedRecipes = async () => {
  try {
    await Recipe.deleteMany({});
    await Recipe.insertMany(recipeData);
    console.log('🍽️ Recipes inserted successfully!');
  } catch (err) {
    console.error('❌ Seeding recipes failed:', err);
  }
};

module.exports = seedRecipes;
