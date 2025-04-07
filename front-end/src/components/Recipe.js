import React from 'react';
import { Link } from 'react-router-dom'; 
import './Recipe.css';

function Recipe({ name, cookTime, imageUrl, id }) {
  return (
    <Link to={`/recipe/${id}`} className="recipe"> {/* Ensure id is passed correctly */}
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
