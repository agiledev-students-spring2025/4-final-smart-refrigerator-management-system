// src/components/SearchBar.js
import React, { useState } from 'react';
import './Searchbar.css'; // Import the CSS file for styling

function Searchbar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  function handleInputChange(event) {
    setSearchTerm(event.target.value);
  }

  function handleSearch(event) {
    event.preventDefault();
    if (onSearch) onSearch(searchTerm);  
  }

  return (
    <div className="searchbar-container">
      <h2>Search Recipes</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search bar (e.g., 'Pasta', 'Chicken Stir-fry' )"
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>
    </div>
  );
}

export default Searchbar;
