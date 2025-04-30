// src/components/Dropdown.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dropdown.css';
import API_BASE_URL from '../api';

function Dropdown({ onSelect }) {
  const [selectedOption, setSelectedOption] = useState('');
  const [customOption, setCustomOption] = useState(''); // Store custom 
  const navigate = useNavigate(); 

  const options = [
    'Keto',
    'Vegan',
    'Vegetarian',
    'All Recipes'
  ];

  // Handle change event when an option is selected
  function handleSelectChange(event) {
    const value = event.target.value;
    setSelectedOption(value);
    setCustomOption('');
    if (onSelect) onSelect(value);

    // Navigate to selected
    if (value === 'Keto') {
      navigate('/keto');
    }

    if (value === 'Vegan') {
        navigate('/vegan');
    }

    if (value === 'Vegetarian') {
        navigate('/vegetarian');
    }

    if (value === 'All Recipes') {
      navigate('/allrecipes');
    }
    
  }

  return (
    <div className="dropdown-container">
      <h2>By Category</h2>
      <select
        value={selectedOption}
        onChange={handleSelectChange}
        className="dropdown-select"
      >
        <option value="" disabled>Select Category</option> 
        {options.map((option, index) => (
          <option key={index} value={option}>{option}</option> 
        ))}
      </select>
      
    </div>
  );
}

export default Dropdown;
