import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';  // Import useParams for dynamic routing
import Timer from './Timer';
import './FullRecipe.css';

function FullRecipe() {
  const { id } = useParams();  // Get the dynamic ID from the URL
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch recipe data based on ID from URL
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/recipes/${id}`);
        const data = await response.json();
        if (response.ok) {
          setRecipe(data.data);
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

  // Display loading message or error
  if (loading) {
    return <p>Loading recipe...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
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
          <div className="ingredients-container">
            {recipe.ingredients.map((ingredient, index) => (
              <p key={index}>{ingredient}</p>
            ))}
          </div>

          <h3>Cook</h3>
          <div className="instructions-container">
            {recipe.instructions.map((instruction, index) => (
              <p key={index}>{instruction}</p>
            ))}
          </div>

          <Timer />
        </>
      )}
    </div>
  );
}

export default FullRecipe;
