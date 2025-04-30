import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Searchbar from './Searchbar';
import Dropdown from './Dropdown';
import Recipe from './Recipe';
import './RecipeSuggestions.css'; 
import API_BASE_URL from '../api';
import { FaArrowLeft } from "react-icons/fa";

function AllRecipes() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading
  const [error, setError] = useState(null);

  // Fetch all recipes only on initial load
  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true); // Set loading to true when fetching
      try {
        const response = await fetch(`${API_BASE_URL}/recipes`);
        const data = await response.json();

        if (response.ok && data.status === 'success') {
          setRecipes(data.data);  // Store all recipes
          setFilteredRecipes(data.data);  // Set the initial filtered recipes to all recipes
        } else {
          setError('Failed to load recipes');
        }
      } catch (error) {
        setError('Error fetching recipes');
      } finally {
        setLoading(false); // Set loading to false once fetching is done
      }
    };

    fetchRecipes();
  }, []);  // Empty dependency array ensures this runs only once on initial load

  // Handle search term change
  function handleSearch(term) {
    setSearchTerm(term);
  }

  // Filter recipes based on the search term
  useEffect(() => {
    setLoading(true); // Set loading to true when filtering starts

    const lowerSearch = searchTerm.toLowerCase();

    const filtered = recipes.filter(recipe => {
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
    });

    setFilteredRecipes(filtered);
    setLoading(false); // Set loading to false once filtering is done
  }, [searchTerm, recipes]);  // Run this effect when the search term or recipes change

  // Handle dropdown selection (if needed, you can handle specific filtering here)
  function handleDropdownSelect(value) {
  }

  return (
    <div className="recipe-suggestions-container">
      <h1>Recipe Suggestions</h1>

      <Searchbar onSearch={handleSearch} />
      <Dropdown onSelect={handleDropdownSelect} />

      <div className="Suggested-Recipes">
        <h3>All Recipes</h3>

        {loading ? (
          <p>Loading...</p> // Display "Loading..." while recipes are being filtered or fetched
        ) : error ? (
          <p>{error}</p> // Show error message if there's an issue fetching recipes
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
          <p>No recipes found matching your search.</p> 
        )}
      </div>
    </div>
  );
}

export default AllRecipes;
