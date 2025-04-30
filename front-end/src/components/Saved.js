import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Searchbar from './Searchbar';
import Dropdown from './Dropdown';
import Recipe from './Recipe';
import './RecipeSuggestions.css'; 
import API_BASE_URL from '../api';

function RecipeSuggestions() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setFilter] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get the logged-in user's email from localStorage
  const email = localStorage.getItem("userEmail");

  // Fetch recipes from the backend
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/recipes`);
        const data = await response.json();

        if (response.ok) {
          setRecipes(data.data); // Assuming the recipes are under data.data
        } else {
          setError('Failed to load recipes');
        }
      } catch (err) {
        setError('Error fetching recipes');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  // Handle search term
  function handleSearch(term) {
    setSearchTerm(term);
  }

  // Handle dropdown selection
  function handleDropdownSelect(value) {
    setFilter(value);
  }

  // Filter recipes based on favorite status, search term, and filter
  const filteredRecipes = recipes
    .filter(recipe => recipe.favorite && recipe.favorite.includes(email)) // Only include recipes favorited by the logged-in user
    .filter(recipe => {
      const matchesSearch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = selectedFilter
        ? recipe.ingredients.some(ingredient =>
            ingredient.toLowerCase().includes(selectedFilter.toLowerCase())
          )
        : true;
      return matchesSearch && matchesFilter;
    });

  return (
    <div className="recipe-suggestions-container">
      <h1>Saved Favorite Recipes</h1>

      <Searchbar onSearch={handleSearch} /> 
      <Dropdown onSelect={handleDropdownSelect} /> 

      <div className="Suggested-Recipes">
        <h3>Saved in My Favorite Recipes:</h3>

        {loading ? (
          <p>Loading recipes...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          filteredRecipes.length > 0 ? (
            <div className="recipe-grid">
              {filteredRecipes.map(recipe => (
                <Recipe 
                  key={recipe._id} 
                  _id={recipe._id}
                  name={recipe.name}
                  description={recipe.description}
                  ingredients={recipe.ingredients.join(', ')} // Convert array to string
                  imageUrl={recipe.imageUrl}
                />
              ))}
            </div>
          ) : (
            <p>No favorite recipes found.</p>
          )
        )}
      </div>
    </div>
  );
}

export default RecipeSuggestions;
