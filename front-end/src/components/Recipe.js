import React from 'react';
import { Link } from 'react-router-dom'; 
import './Recipe.css';

function Recipe({  _id, name, time, imageUrl }) {
  console.log('🔗 Linking to recipe ID:', _id);  // 👈 Add this
  
  return (
    <Link to={`/recipe/${_id}`} className="recipe">
      <img
        src={imageUrl}
        alt={name}
        className="recipe-image"
      />
      
      <div className="recipe-info">
        <name>{name}</name>  
        <time>{time}</time>
      </div>
    </Link>
  );
}

export default Recipe;
