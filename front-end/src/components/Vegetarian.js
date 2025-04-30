import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Searchbar from './Searchbar';
import Dropdown from './Dropdown';
import Recipe from './Recipe';
import './RecipeSuggestions.css'; 
import API_BASE_URL from '../api';
import { FaArrowLeft } from "react-icons/fa";

function Vegetarian() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setFilter] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [loading, setLoading] = useState(true);  // Loading state for fetch and filtering

  // Fetch all recipes on mount
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/recipes`);
        const data = await response.json();

        if (data.status === 'success') {
          setRecipes(data.data);
          // Filter initial recipes to only include Vegetarian recipes
          const vegetarianRecipes = data.data.filter(recipe => recipe.filter && recipe.filter.toLowerCase() === 'vegetarian');
          setFilteredRecipes(vegetarianRecipes);
        }
      } catch (error) {
        console.error('Error fetching recipes:', error);
      } finally {
        setLoading(false);  // Stop loading once fetch is complete
      }
    };

    fetchRecipes();
  }, []);  // Fetch only once on initial load

  // Handle search term
  function handleSearch(term) {
    setSearchTerm(term);
    const lowerSearch = term.toLowerCase();

    // Set loading to true when filtering starts
    setLoading(true);

    // Filter vegetarian recipes based on search term (in name or ingredients)
    const filtered = recipes.filter(recipe => {
      if (recipe.filter && recipe.filter.toLowerCase() === 'vegetarian') {
        // Check if the recipe name contains the search term
        const nameMatches = recipe.name.toLowerCase().includes(lowerSearch);
        
        // Check if any ingredient matches the search term
        const ingredientMatches = recipe.ingredients && recipe.ingredients.some(ingredient => {
          if (typeof ingredient === 'string') {
            return ingredient.toLowerCase().includes(lowerSearch);
          } else if (ingredient && typeof ingredient.name === 'string') {
            return ingredient.name.toLowerCase().includes(lowerSearch);
          }
          return false;
        });

        return nameMatches || ingredientMatches;
      }
      return false;
    });

    setFilteredRecipes(filtered);

    // Stop loading after filtering is done
    setLoading(false);
  }

  // Handle dropdown selection
  function handleDropdownSelect(value) {
    setFilter(value);
  }

  return (
    <div className="recipe-suggestions-container">
      <div className="back-button" onClick={() => navigate("/home")}>
        <FaArrowLeft /> Back
      </div>
      <h1>Recipe Suggestions</h1>

      <Searchbar onSearch={handleSearch} />
      <Dropdown onSelect={handleDropdownSelect} />

      <div className="Suggested-Recipes">
        <h3>Vegetarian Recipes</h3>

        {loading ? (
          <p>Loading...</p>  
        ) : filteredRecipes.length > 0 ? (
          <div className="recipe-grid">
            {filteredRecipes.map(recipe => (
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
          <p>No Vegetarian recipes found.</p>  
        )}
      </div>
    </div>
  );
}

export default Vegetarian;
