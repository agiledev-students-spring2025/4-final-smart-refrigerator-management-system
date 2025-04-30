import React, { useState } from 'react';
import './Searchbar.css'; 

//needs to use database/backend for results

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
          placeholder="Search All Recipes(by ingredient or name )"
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>
    </div>
  );
}

export default Searchbar;
