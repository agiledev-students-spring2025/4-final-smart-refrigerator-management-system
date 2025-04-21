import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import Timer from './Timer';
import './FullRecipe.css';

function FullRecipe() {
  const { id } = useParams();  // Get the dynamic ID from the URL
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);  // State to track favorite status

  // Fetch recipe data based on ID from URL
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/recipes/${id}`);
        const data = await response.json();
        console.log("Fetched recipe data:", data);
        if (response.ok) {
          setRecipe(data.data);
          setIsFavorite(data.data.favorite); // Set the initial state based on the recipe's current favorite status
        } else {
          setError('Recipe not found');
        }
      } catch (err) {
        setError('Failed to fetch recipe');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);  // Re-run the effect if the ID changes

  // Handle favorite toggle
  const toggleFavorite = async () => {
    console.log("Toggling favorite. Current isFavorite:", isFavorite);

    try {
      // Update the favorite property on the backend
      const response = await fetch(`http://localhost:5001/api/recipes/${id}`, {
        method: 'PUT', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ favorite: !isFavorite }), 
      });
      console.log("ID being sent from frontend:", id);

      if (response.ok) {
        const updatedRecipe = await response.json();
        console.log("Updated recipe data:", updatedRecipe);
        setIsFavorite(updatedRecipe.data.favorite);  // Update local favorite state with the response
      } else {
        console.error('Failed to update favorite status');
      }
    } catch (err) {
      console.error('Error toggling favorite:', err);
    }
  };

  // Display loading message or error
  if (loading) {
    return <p>Loading recipe...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="full-recipe-container">
      {recipe && (
        <>
          <img
            src={recipe.imageUrl}
            alt={recipe.name}
            className="recipe-full-image"
          />
          <h1>{recipe.name}</h1>
          <h4>Cook time: {recipe.time}</h4>

          <h3>Ingredients</h3>
          <ul className="ingredients-container">
            {recipe.ingredients.map(({ _id, quantity, name }, idx) => (
              <li key={_id || idx}>
                {quantity} {name}
              </li>
            ))}
          </ul>

          <h3>Cook</h3>
          <div className="instructions-container">
            {recipe.instructions.map((instruction, index) => (
              <p key={index}>{instruction}</p>
            ))}
          </div>

          <Timer />

          {/* Favorite Heart Icon */}
          <FontAwesomeIcon
            icon={isFavorite ? solidHeart : regularHeart}
            className={`heart-icon ${isFavorite ? 'filled' : ''}`}
            onClick={toggleFavorite}
          />

        </>
      )}
    </div>
  );
}

export default FullRecipe;
