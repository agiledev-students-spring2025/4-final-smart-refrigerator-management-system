// src/components/Recipe.js
import React from 'react';
import { Link } from 'react-router-dom';
import FullRecipe from './FullRecipe';
import './Recipe.css';

function Recipe({ name, cookTime, ingredients, imageUrl, id }) {
    //gonna have to edit so id is matched to each recipe and then pass id to FullRecipe to fetch from data and render on page
  return (
    
      <Link to={`/full-recipe`} className="recipe">
        <img
            src={imageUrl}
            alt={name}
            className="recipe-image"
        />

        <div className="recipe-info">
          <name>{name}</name>
          <time>{cookTime}</time>
        </div>
      </Link>
    
  );
}

export default Recipe;
