// src/components/AiRecipes.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Searchbar from './Searchbar';
import Dropdown from './Dropdown';
import Recipe from './Recipe';
import './RecipeSuggestions.css'; 

function RecipeSuggestions() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setFilter] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch recipes from the backend
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/recipes');
        const data = await response.json();
        console.log('📦 Fetched recipes:', data); // ← Add this line

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

  // Filter recipes based on search term and selected filter
  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter ? recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(selectedFilter.toLowerCase())) : true;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="recipe-suggestions-container">
      <h1>Recipe Suggestions</h1>

      <Searchbar onSearch={handleSearch} /> 
      <Dropdown onSelect={handleDropdownSelect} /> 

      <div className="Suggested-Recipes">
        <h3>AI Suggested Recipes Based on Ingredients:</h3>

        {loading ? (
          <p>Loading recipes...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          filteredRecipes.length > 0 ? (
            filteredRecipes.map(recipe => (
              <Recipe 
                key={recipe._id} // Make sure the recipe has a unique key
                _id={recipe._id}  
                name={recipe.name}
                description={recipe.description}
                ingredients={recipe.ingredients.join(', ')} // Join ingredients array to a string
                imageUrl={recipe.imageUrl}
              />
            ))
          ) : (
            <p>No recipes found matching your criteria.</p>
          )
        )}
      </div>
    </div>
  );
}

export default RecipeSuggestions;

