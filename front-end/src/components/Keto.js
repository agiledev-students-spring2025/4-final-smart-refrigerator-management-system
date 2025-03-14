// src/components/RecipeSuggestions.js
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Searchbar from './Searchbar';
import Dropdown from './Dropdown';
import Recipe from './Recipe';
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

      <Searchbar onSearch={handleSearch} /> 
      
      <Dropdown onSelect={handleDropdownSelect} /> 
      
      <div className="Suggested-Recipes">
        <h3>Keto </h3>
            <Recipe 
                name="Mac n Cheese"
                description="This baked mac and cheese is a family favorite recipe, loved by both children and adults. It uses a combination of cheeses, layered in the dish as well as melted into a rich and creamy cheese sauce, for the ultimate in cheesy deliciousness! Perfect for a comforting dinner or as a holiday side dish!"
                ingredients="Salt, elbow pasta, unsalted butter, whole milk, half n half, cheddar, gruyere, smoked paprika"
                imageUrl="https://picsum.photos/seed/1/200/200" 
            /> 
        
      </div>

    </div>
  );
}

export default RecipeSuggestions;
