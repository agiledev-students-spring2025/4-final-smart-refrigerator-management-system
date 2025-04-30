const fs = require('fs');
const path = require('path');
const Recipe = require('../models/Recipe');

const seedFilePath = path.join(__dirname, '../prepopulated_Data/seed_recipe.json');
const recipeData = JSON.parse(fs.readFileSync(seedFilePath, 'utf-8'));

const seedRecipes = async () => {
  try {
    // Clear the collection (uncomment if you're not updating)
    //await Recipe.deleteMany({});

    // Insert the recipes into the database (uncomment if you're not updating)
    //const result = await Recipe.insertMany(recipeData, { ordered: false });
    
    console.log('Recipes inserted successfully!');
  } catch (err) {
    console.error('Seeding recipes failed:', err);
    if (err.writeErrors) {
      console.error("Write Errors: ", err.writeErrors);  
    }
  }
};

module.exports = seedRecipes; // Ensure it's being exported correctly
