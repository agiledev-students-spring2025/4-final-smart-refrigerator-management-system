// src/components/RecipeSuggestions.js
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Searchbar from './Searchbar';
import Dropdown from './Dropdown';
import './RecipeSuggestions.css'; 

function RecipeSuggestions() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setFilter] = useState('');

  // Handle search term
  function handleSearch(term) {
    setSearchTerm(term); // Update search term state
  }

  // Handle dropdown selection
  function handleDropdownSelect(value) {
    setFilter(value); 
  }

  return (
    <div className="recipe-suggestions-container">
      <h1>Recipe Suggestions</h1>

      <Searchbar onSearch={handleSearch} /> {/* Searchbar component */}
      
      <Dropdown onSelect={handleDropdownSelect} /> {/* Dropdown component */}

      <div className="AI-suggested">
        <h3>AI Suggested Recipes Based on Ingredients: </h3>
       
      </div>

      <div className="Favorite-recipes">
        <h3>Saved in My Favorite Recipes: </h3>
       
      </div>
    </div>
  );
}

export default RecipeSuggestions;
