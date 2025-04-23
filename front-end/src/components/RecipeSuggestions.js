import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";  
import Searchbar from './Searchbar';
import Dropdown from './Dropdown';
import Recipe from './Recipe';  // Ensure Recipe component is correctly imported
import './RecipeSuggestions.css'; 

function RecipeSuggestions() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setFilter] = useState('');
  const [suggestedRecipes, setSuggestedRecipes] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  // Fetch recipes from the backend
  useEffect(() => {
    // Fetch suggested recipes
    fetch('http://localhost:5001/api/recipes')
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          setSuggestedRecipes(data.data);
        }
      })
      .catch(error => console.error('Error fetching suggested recipes:', error));

    // Fetch all recipes, but we will filter favorites in the frontend
    fetch('http://localhost:5001/api/recipes')
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          setFavoriteRecipes(data.data);
        }
      })
      .catch(error => console.error('Error fetching favorite recipes:', error));
  }, []);

  // Handle search term
  function handleSearch(term) {
    setSearchTerm(term); 
    fetch(`http://localhost:5001/api/recipes/search?query=${term}`)
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          setSuggestedRecipes(data.data);
        }
      })
      .catch(error => console.error('Error fetching searched recipes:', error));
  }

  // Handle dropdown selection
  function handleDropdownSelect(value) {
    setFilter(value); 
  }

  // Filter recipes based on search term
  function filterRecipes(recipes) {
    if (!searchTerm) return recipes;
  
    const lowerSearch = searchTerm.toLowerCase();
  
    return recipes.filter(recipe => {
      // Check recipe name
      const nameMatches = recipe.name && recipe.name.toLowerCase().includes(lowerSearch);
  
      // Check ingredients
      let ingredientMatches = false;
      if (Array.isArray(recipe.ingredients)) {
        ingredientMatches = recipe.ingredients.some(ingredient => {
          if (typeof ingredient === 'string') {
            return ingredient.toLowerCase().includes(lowerSearch);
          } else if (ingredient && typeof ingredient.name === 'string') {
            return ingredient.name.toLowerCase().includes(lowerSearch);
          }
          return false;
        });
      }
  
      if (nameMatches || ingredientMatches) {
        return true;
      } else {
        return false;
      }
    });
  }
  

  // Apply the filter to suggested and favorite recipes
  const filteredSuggestedRecipes = filterRecipes(suggestedRecipes);
  const filteredFavoriteRecipes = filterRecipes(favoriteRecipes);

  // Filter favorite recipes to only show those where "favorite" is true
  const filteredFavoriteRecipesOnly = filteredFavoriteRecipes.filter(recipe => recipe.favorite === true);

  // Only show the first 4 recipes in the grid for both suggested and favorite recipes
  const limitedSuggestedRecipes = filteredSuggestedRecipes.slice(0, 4);
  const limitedFavoriteRecipes = filteredFavoriteRecipesOnly.slice(0, 4);

  return (
    <div className="recipe-suggestions-container">
      <h1>Recipe Suggestions</h1>

      <Searchbar onSearch={handleSearch} /> 
      <Dropdown onSelect={handleDropdownSelect} /> 

      <div className="Suggested-Recipes">
        <h3>AI Suggested Recipes Based on Ingredients: </h3>
        {limitedSuggestedRecipes.length > 0 ? (
          <div className="recipe-grid">
            {limitedSuggestedRecipes.map(recipe => (
              <Recipe 
                key={recipe._id}
                _id={recipe._id}
                name={recipe.name}
                time={recipe.time}
                imageUrl={recipe.imageUrl} 
              />
            ))}
          </div>
        ) : (
          <p>No suggested recipes found.</p>
        )}

        <div className="more-link-container">
          <Link to="/AiRecipes" className="more-link">More...</Link>
        </div>
      </div>

      <div className="Suggested-Recipes">
        <h3>Saved in My Favorite Recipes: </h3>
        {limitedFavoriteRecipes.length > 0 ? (
          <div className="recipe-grid">
            {limitedFavoriteRecipes.map(recipe => (
              <Recipe 
                key={recipe._id}
                _id={recipe._id}
                name={recipe.name}
                time={recipe.time}
                imageUrl={recipe.imageUrl} 
              />
            ))}
          </div>
        ) : (
          <p>No favorite recipes found.</p>
        )}

        <div className="more-link-container">
          <Link to="/Saved" className="more-link">More...</Link>
        </div>
      </div>
    </div>
  );
}

export default RecipeSuggestions;
