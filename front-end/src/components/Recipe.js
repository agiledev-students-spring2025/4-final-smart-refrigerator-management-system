import React from 'react';
import './Recipe.css';

const Recipe = () => {

  return (
    <div className="recipe-grid">
      <div className="recipe">
        <div className="recipe-image-container">
          <img
            src={`https://picsum.photos/seed/1/200/200`}
            // https://www.momontimeout.com/easy-chicken-stir-fry-recipe/ stir fry
            className="recipe-image"
          />
        </div>
        <div className="recipe-info">
          <h3>Mac n Cheese</h3>
          <p>
            This baked mac and cheese is a family favorite recipe, perfect for a comforting dinner or as
            a holiday side dish!
          </p>
          <p>Ingredients: Salt, elbow pasta, unsalted butter, whole milk, half n half, cheddar, gruyere, smoked paprika</p>
        </div>
      </div>
    </div>
  );
};

export default Recipe;
