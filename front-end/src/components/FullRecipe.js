import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import Timer from './Timer';
import './FullRecipe.css';
import API_BASE_URL from '../api';

function FullRecipe() {
  const { id } = useParams();  
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);  

  // Get the current user's email 
  const currentUserEmail = localStorage.getItem('userEmail');

  // Fetch recipe data based on ID from URL
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/recipes/${id}`);
        const data = await response.json();
        
        if (response.ok) {
          // Ensure favorite is always an array
          const favoriteArray = Array.isArray(data.data.favorite) ? data.data.favorite : [];
          setRecipe({...data.data, favorite: favoriteArray});
  
          // Check if the current user has this recipe marked as a favorite
          console.log("currentUserEmail: ", currentUserEmail);
          setIsFavorite(favoriteArray.includes(currentUserEmail)); // Check if the current user's email is in the favorite array
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
  }, [id, currentUserEmail]);
  
  // Handle favorite toggle
  const toggleFavorite = async () => {
    try {
      const updatedFavoriteArray = [...recipe.favorite];  // Shallow copy to avoid mutation
  
      if (updatedFavoriteArray.includes(currentUserEmail)) {
        // Remove email from favorites
        const index = updatedFavoriteArray.indexOf(currentUserEmail);
        if (index > -1) {
          updatedFavoriteArray.splice(index, 1);
        }
      } else {
        // Add email to favorites
        updatedFavoriteArray.push(currentUserEmail);
      }
  
      // Clean the array: remove any invalid values
      const cleanedFavoriteArray = updatedFavoriteArray.filter(email => email && typeof email === 'string');
  
      // Update the favorite list in the backend
      await updateFavoriteArray(cleanedFavoriteArray);
    } catch (err) {
      console.error("Error toggling favorite:", err);
    }
  };
  
  
  // Function to update the favorite list in the backend
  const updateFavoriteArray = async (updatedFavoriteArray) => {
    try {
      const response = await fetch(`${API_BASE_URL}/recipes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          favoriteEmail: currentUserEmail,  // Send the current user's email to backend
        }),
      });
  
      const result = await response.json();
      if (response.ok) {
        setRecipe(prevRecipe => ({
          ...prevRecipe,
          favorite: updatedFavoriteArray,
        }));
  
        setIsFavorite(updatedFavoriteArray.includes(currentUserEmail));
      } else {
        console.error("Failed to update favorite:", result);
      }
    } catch (err) {
      console.error("Error updating favorite array:", err);
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
