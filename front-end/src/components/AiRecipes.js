import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Searchbar from './Searchbar';
import Dropdown from './Dropdown';
import Recipe from './Recipe';
import './RecipeSuggestions.css'; 
import { useInventory } from '../contexts/InventoryContext'; 
import API_BASE_URL from '../api';

function AiRecipe() {
  const navigate = useNavigate();
  const { getItemsByCompartment } = useInventory();  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setFilter] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [loading, setLoading] = useState(false); // Controls loading state (both fetching and filtering)
  const [error, setError] = useState(null);
  const [fridgeIngredients, setFridgeIngredients] = useState([]);  // Store fridge ingredients here

  // Helper function to get all ingredients from the fridge
  const getFridgeIngredientsFromInventory = () => {
    let fridgeItems = [];
    const compartments = getItemsByCompartment();  

    Object.values(compartments).forEach(compartment => {
      compartment.forEach(item => {
        fridgeItems.push(item.name.toLowerCase()); 
      });
    });
    setFridgeIngredients(fridgeItems); // Store fridge ingredients in state
  };

  // Fetch recipes from the backend (only on initial load)
  useEffect(() => {
    const fetchRecipes = async () => {
      if (recipes.length > 0) {
        // Skip the API call if recipes are already fetched
        setLoading(false);
        return;
      }

      setLoading(true); // Start loading state

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

    fetchRecipes(); // Run only once when component mounts
  }, [recipes]);  // Dependency on 'recipes' to avoid re-fetch if already populated

  // Update fridge ingredients only once on component mount (not in the fetch effect)
  useEffect(() => {
    getFridgeIngredientsFromInventory();
  }, []);  // Run only once when component mounts

  // Filter recipes based on fridge ingredients
  const filterRecipesByFridgeIngredients = (recipes, fridgeItems) => {
    return recipes.filter(recipe => {
      return recipe.ingredients && recipe.ingredients.some(ingredient => {
        if (typeof ingredient === 'string') {
          return fridgeItems.includes(ingredient.toLowerCase());  
        } else if (ingredient && ingredient.name) {
          return fridgeItems.includes(ingredient.name.toLowerCase()); 
        }
        return false;
      });
    });
  };

  // Handle search term
  function handleSearch(term) {
    setSearchTerm(term);
  }

  // Handle dropdown selection
  function handleDropdownSelect(value) {
    setFilter(value);
  }

  // Filter recipes based on search term 
  useEffect(() => {
    if (recipes.length === 0) return; // Avoid filtering when no recipes are fetched
    
    setLoading(true); // Start loading state while filtering

    // Filter recipes based on search term and fridge ingredients
    const lowerSearch = searchTerm.toLowerCase();

    const filtered = recipes.filter(recipe => {
      const matchesSearch = recipe.name.toLowerCase().includes(lowerSearch);
      const matchesFilter = selectedFilter ? recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(selectedFilter.toLowerCase())) : true;
      return matchesSearch && matchesFilter;
    });

    const finalFilteredRecipes = filterRecipesByFridgeIngredients(filtered, fridgeIngredients);
    setFilteredRecipes(finalFilteredRecipes);
    setLoading(false); // End loading state after filtering
  }, [searchTerm, selectedFilter, recipes, fridgeIngredients]);  // Triggered on changes in search term, selected filter, recipes, or fridge ingredients

  return (
    <div className="recipe-suggestions-container">
      <h1>AI Suggested Recipes</h1>

      <Searchbar onSearch={handleSearch} /> 
      <Dropdown onSelect={handleDropdownSelect} /> 

      <div className="Suggested-Recipes">
        <h3>AI Suggested Recipes Based on Ingredients:</h3>

        {loading ? (
          <p>Loading recipes...</p> // Show loading message while either fetching or filtering
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

export default AiRecipe;
