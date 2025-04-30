import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";  
import Searchbar from './Searchbar';
import Dropdown from './Dropdown';
import Recipe from './Recipe';  
import './RecipeSuggestions.css'; 
import API_BASE_URL from '../api';
import { FaArrowLeft } from "react-icons/fa";
import { useInventory } from '../contexts/InventoryContext';  // Import to access fridge items

function RecipeSuggestions() {
  const navigate = useNavigate();
  const { getItemsByCompartment } = useInventory();  // Get fridge items
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setFilter] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [loading, setLoading] = useState(false); // Controls loading state
  const [fridgeIngredients, setFridgeIngredients] = useState([]); // Store fridge ingredients here
  const [error, setError] = useState(null); // Store error state

  const email = localStorage.getItem("userEmail");

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
  }, []);  // Empty dependency array ensures this only runs on mount

  // Update fridge ingredients once on component mount
  useEffect(() => {
    getFridgeIngredientsFromInventory();
  }, []);  // Only run once on mount

  // Fetch favorite recipes based on email
  useEffect(() => {
    const fetchFavoriteRecipes = async () => {
      setLoading(true); // Start loading state

      try {
        const response = await fetch(`${API_BASE_URL}/recipes`);
        const data = await response.json();

        if (response.ok && data.status === 'success') {
          const filteredFavorites = data.data.filter(recipe => 
            recipe.favorite && Array.isArray(recipe.favorite) && recipe.favorite.includes(email)
          );
          setFavoriteRecipes(filteredFavorites);  // Set favorite recipes
        } else {
          setError('Failed to load favorite recipes');
        }
      } catch (error) {
        setError('Error fetching favorite recipes');
      } finally {
        setLoading(false); // Set loading to false once fetching is done
      }
    };

    fetchFavoriteRecipes(); // Fetch favorite recipes on mount
  }, [email]);  // Fetch favorites when the email changes (which is tied to the logged-in user)

  // Filter recipes based on fridge ingredients
  const filterRecipesByFridgeIngredients = (recipes, fridgeItems) => {
    if (!fridgeItems || fridgeItems.length === 0) {
      return []; // No fridge items → show no recipes
    }
  
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

  // Filter recipes based on search term and fridge ingredients
  useEffect(() => {
    if (recipes.length === 0) return; // Avoid filtering when no recipes are fetched

    setLoading(true); // Start loading state while filtering

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

  // Limit to display only 4 recipes
  const limitedRecipes = filteredRecipes.slice(0, 4);
  const limitedFavoriteRecipes = favoriteRecipes.slice(0, 4);  // Limit favorite recipes to 4

  return (
    <div className="recipe-suggestions-container">
      <div className="back-button" onClick={() => navigate("/home")}>
        <FaArrowLeft /> Back
      </div>
      <h1>Recipe Suggestions</h1>

      <Searchbar onSearch={handleSearch} />
      <Dropdown onSelect={handleDropdownSelect} />

      <div className="Suggested-Recipes">
        <h3>Suggested Recipes Based on Ingredients:</h3>

        {loading ? (
          <p>Loading recipes...</p> // Show loading message while either fetching or filtering
        ) : error ? (
          <p>{error}</p>
        ) : (
          limitedRecipes.length > 0 ? (
            <div className="recipe-grid">
              {limitedRecipes.map(recipe => (
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
            <p>No recipes found matching your criteria.</p>
          )
        )}

          <div className="more-link-container">
            <Link to="/AiRecipes" className="more-link">More...</Link>
          </div>
      </div>
      <div className="Suggested-Recipes">
        <h3>Saved in My Favorite Recipes:</h3>

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
          <p>No favorite recipes found, heart a recipe to add.</p>
        )}

        <div className="more-link-container">
          <Link to="/Saved" className="more-link">More...</Link>
        </div>
      </div>
      
      
    </div>
  );
}

export default RecipeSuggestions;

