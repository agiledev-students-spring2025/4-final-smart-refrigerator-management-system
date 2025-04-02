// src/components/FullRecipe.js
import React from 'react';
import Timer from './Timer';
import './FullRecipe.css'; 

//needs to use backend AI and database for real recipes/images

function FullRecipe() {
  return (
    <div>
      
        <img
            src = "https://picsum.photos/seed/1/200/200" 
            className="recipe-full-image"
        />

        <h1>Mac n Cheese</h1>
        <h4>Cook time: 40 min</h4>

        <h3>Ingredients</h3>
        <div className="ingredients-container">
          <p>Salt</p>
          <p>Elbow Pasta</p>
          <p>Unsalted Butter</p>
          <p>Whole Milk</p>
          <p>Half n Half</p>
          <p>Cheddar</p>
          <p>Gruyere</p>
          <p>Smoked Paprika</p>
        </div>

        <h3>Cook</h3>
        <div className="instructions-container">
          <p>1. Cook Pasta</p>
          <p>2. Shred cheese</p>
          <p>3. Put butter, whole milk, half n half and seasonings on low heat until boil</p>
          <p>4. Add 2/3 of shredded cheese and mix until smooth</p>
          <p>5. take off heat, strain pasta and add to cheese mixture</p>
          <p>6. Add to baking dish and distribute shreeded cheese on top evenly</p>
          <p>7. Cook in oven on bake 365 for 25 minutes</p>

          <Timer></Timer>
        </div>
    </div>
  );
}

export default FullRecipe;