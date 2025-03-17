// src/components/Dropdown.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dropdown.css';

function Dropdown({ onSelect }) {
  const [selectedOption, setSelectedOption] = useState('');
  const [customOption, setCustomOption] = useState(''); // Store custom 
  const navigate = useNavigate(); 

  const options = [
    'Keto',
    'Vegan',
    'Vegetarian',
    'Custom Entry'
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

    
  }

  //custom might require AI to recognize needs of category so backend/database dietary restrictions (?)
  // Handle change event for custom input
  function handleCustomInputChange(event) {
    setCustomOption(event.target.value);
    if (onSelect) onSelect(event.target.value);
  }

  return (
    <div className="dropdown-container">
      <h2>Set Filter</h2>
      <select
        value={selectedOption}
        onChange={handleSelectChange}
        className="dropdown-select"
      >
        <option value="" disabled>Set filter</option> {/* Default option */}
        {options.map((option, index) => (
          <option key={index} value={option}>{option}</option> 
        ))}
      </select>

      {/* If "Custom Entry" is selected, show an input field */}
      {selectedOption === 'Custom Entry' && (
        <div>
          <input
            type="text"
            value={customOption}
            onChange={handleCustomInputChange}
            className="custom-input"
            placeholder="Enter your custom option"
          />
        </div>
      )}
    </div>
  );
}

export default Dropdown;
