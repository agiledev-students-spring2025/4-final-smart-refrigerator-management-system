// src/components/Dropdown.js
import React, { useState } from 'react';
import './Dropdown.css';  

function Dropdown({ onSelect }) {
  const [selectedOption, setSelectedOption] = useState('');
  const [customOption, setCustomOption] = useState(''); // Store custom option input

  // Sample options for the dropdown
  const options = [
    'Keto',
    'Vegan',
    'Vegetarian',
    'Pescetarian',
    'Custom Entry' 
];

  // Handle change event when an option is selected
  function handleSelectChange(event) {
    setSelectedOption(event.target.value);
    setCustomOption(''); // Reset custom input field when switching options
    if (onSelect) onSelect(event.target.value); // Pass the selected value to parent
  }

  // Handle change event for custom input
  function handleCustomInputChange(event) {
    setCustomOption(event.target.value); // Update custom input value
    if (onSelect) onSelect(event.target.value); // Pass custom value to parent
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
          <option key={index} value={option}>{option}</option> // Render each option
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
