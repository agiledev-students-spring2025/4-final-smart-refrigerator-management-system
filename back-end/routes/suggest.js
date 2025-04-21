const router = express.Router();

// Suggest recipes based on inventory with 70%+ match threshold and missing ingredient display
router.post('/suggest', async (req, res) => {
    const { inventory } = req.body;
    if (!Array.isArray(inventory)) {
      return res.status(400).json({ status: 'error', message: 'Inventory must be an array of ingredients' });
    }
  
    const normalizedInventory = inventory.map(item => item.toLowerCase());
    const recipes = await Recipe.find();
  
    const suggestions = recipes
      .map(recipe => {
        const totalIngredients = recipe.ingredients.length;
  
        const matchedIngredients = recipe.ingredients.filter(ingredient =>
          normalizedInventory.includes(ingredient.toLowerCase())
        );
  
        const missingIngredients = recipe.ingredients.filter(ingredient =>
          !normalizedInventory.includes(ingredient.toLowerCase())
        );
  
        const matchCount = matchedIngredients.length;
        const matchRatio = matchCount / totalIngredients;
  
        return {
          ...recipe._doc,
          matchCount,
          totalIngredients,
          matchPercentage: Math.round(matchRatio * 100),
          missingIngredients
        };
      })
      .filter(recipe => recipe.matchPercentage >= 70)
      .sort((a, b) => b.matchPercentage - a.matchPercentage || b.matchCount - a.matchCount);
  
    res.json({ status: 'success', data: suggestions });
  });

module.exports = router;
