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
  },
  favorite: {type: [String], default: []},
  filter: { type: String}
});


module.exports = mongoose.model('Recipe', RecipeSchema);
