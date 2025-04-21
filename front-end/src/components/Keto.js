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

  // Fetch all recipes on mount
  useEffect(() => {
    fetch('http://localhost:5001/api/recipes')
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          setRecipes(data.data);
        }
      })
      .catch(error => console.error('Error fetching recipes:', error));
  }, []);

  // Handle search term
  function handleSearch(term) {
    setSearchTerm(term);
    setSearchTerm(term);
  }

  // Handle dropdown selection
  function handleDropdownSelect(value) {
    setFilter(value);
    setFilter(value);
  }

  // Filter only Keto recipes (case-insensitive)
  const ketoRecipes = recipes.filter(recipe => {
    return recipe.filter && recipe.filter.toLowerCase() === 'keto';
  });

  return (
    <div className="recipe-suggestions-container">
      <h1>Recipe Suggestions</h1>

      <Searchbar onSearch={handleSearch} /> 
      <Dropdown onSelect={handleDropdownSelect} /> 


      <div className="Suggested-Recipes">
        <h3>Keto Recipes</h3>
        {ketoRecipes.length > 0 ? (
          <div className="recipe-grid">
            {ketoRecipes.map(recipe => (
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
          <p>No Keto recipes found.</p>
        )}
      </div>
    </div>
  );
}

export default RecipeSuggestions;

/*

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

  // Fetch all recipes on mount
  useEffect(() => {
    fetch('http://localhost:5001/api/recipes')
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          setRecipes(data.data);
        }
      })
      .catch(error => console.error('Error fetching recipes:', error));
  }, []);

  // Handle search term
  function handleSearch(term) {
    setSearchTerm(term);
  }

  // Handle dropdown selection
  function handleDropdownSelect(value) {
    setFilter(value);
  }

  // Filter only Keto recipes (case-insensitive)
  const ketoRecipes = recipes.filter(recipe => {
    return recipe.filter && recipe.filter.toLowerCase() === 'keto';
  });

  return (
    <div className="recipe-suggestions-container">
      <h1>Recipe Suggestions</h1>

      <Searchbar onSearch={handleSearch} /> 
      <Dropdown onSelect={handleDropdownSelect} /> 

      <div className="Suggested-Recipes">
        <h3>Keto Recipes</h3>
        {ketoRecipes.length > 0 ? (
          <div className="recipe-grid">
            {ketoRecipes.map(recipe => (
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
          <p>No Keto recipes found.</p>
        )}
      </div>
    </div>
  );
}

export default RecipeSuggestions;

*/