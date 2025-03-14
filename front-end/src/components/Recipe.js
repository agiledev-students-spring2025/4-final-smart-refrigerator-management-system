// src/components/Recipe.js
import React from 'react';
import { Link } from 'react-router-dom';
import FullRecipe from './FullRecipe';
import './Recipe.css';

function Recipe({ name, description, ingredients, imageUrl, id }) {
    //gonna have to edit so id is matched to each recipe and then pass id to FullRecipe to fetch from data and render on page
  return (
    <div className="recipe-grid">
      <Link to={`/full-recipe`} className="recipe">
        <div className="recipe-image-container">
          <img
            src={imageUrl}
            alt={name}
            className="recipe-image"
          />
        </div>
        <div className="recipe-info">
          <h3>{name}</h3>
          <p>{description}</p>
          <p>Ingredients: {ingredients}</p>
        </div>
      </Link>
    </div>
  );
}

export default Recipe;
