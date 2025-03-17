// src/components/RecipeSuggestions.js
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";  
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
    setSearchTerm(term); 
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
        <h3>AI Suggested Recipes Based on Ingredients: </h3>
            <div className="recipe-grid">
                <Recipe 
                    name="Mac n Cheese"
                    cookTime = "10min"
                    imageUrl="https://picsum.photos/seed/1/200/200" 
                /> 
            </div>

            <div className="more-link-container">
                <Link to="/AiRecipes" className="more-link">More...</Link>
            </div>
        
      </div>

      <div className="Suggested-Recipes">
        <h3>Saved in My Favorite Recipes: </h3>

        <div className="recipe-grid">
                <Recipe 
                    name="Easy Chicken Stir Fry Recipe"
                    cookTime = "10min"
                    imageUrl="https://picsum.photos/seed/1/200/200" 
                /> 

                <Recipe 
                    name="Mac n Cheese"
                    cookTime = "10min"
                    imageUrl="https://picsum.photos/seed/1/200/200" 
                /> 

                <Recipe 
                    name="Candied Yams"
                    cookTime = "10min"
                    imageUrl="https://picsum.photos/seed/1/200/200" 
                /> 

                <Recipe 
                    name="Spicy Carbonara"
                    cookTime = "10min"
                    imageUrl="https://picsum.photos/seed/1/200/200" 
                /> 
        </div>

        <div className="more-link-container">
            <Link to="/Saved" className="more-link">More...</Link>
        </div>
      </div>
    </div>
  );
}

export default RecipeSuggestions;
