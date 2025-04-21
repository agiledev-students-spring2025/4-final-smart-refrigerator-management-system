const mongoose = require('mongoose');

const IngredientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: String, required: true }
});

const RecipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ingredients: { type: [IngredientSchema], required: true },
  time: { type: String, required: true },
  instructions: { type: [String], required: true },
  imageUrl: {
    type: String,
    default: "https://source.unsplash.com/400x300/?food"
  }
});

module.exports = mongoose.model('Recipe', RecipeSchema);
