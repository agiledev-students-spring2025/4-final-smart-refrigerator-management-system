import React, { useState, useEffect } from 'react';
import './StarterItems.css';
import API_BASE_URL from '../api';

function StarterItems() {
  const [starterItems, setStarterItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItems, setSelectedItems] = useState({});

  useEffect(() => {
    fetch(`${API_BASE_URL}/items/starter`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setStarterItems(data.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Failed to load starter items: ' + error.message);
        setLoading(false);
      });
  }, []);

  const toggleItemSelection = (itemId) => {
    setSelectedItems(prevState => ({
      ...prevState,
      [itemId]: !prevState[itemId]
    }));
  };

  const addSelectedToInventory = () => {
    const itemsToAdd = starterItems.filter(item => selectedItems[item.id]);
    
    if (itemsToAdd.length === 0) {
      alert('Please select items to add first');
      return;
    }

    Promise.all(
      itemsToAdd.map(item => 
        fetch(`${API_BASE_URL}/items`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: item.name,
            category: item.category,
            expirationDate: item.nonExpiring ? null : calculateExpirationDate(item.expiresIn),
            quantity: '1',
            storageLocation: 'Pantry'
          }),
        }).then(response => response.json())
      )
    )
      .then(results => {
        alert(`Added ${results.length} items to your inventory!`);
        setSelectedItems({});
      })
      .catch(error => {
        setError('Failed to add items: ' + error.message);
      });
  };

  const calculateExpirationDate = (expiresIn) => {
    if (!expiresIn) return null;
    
    const today = new Date();
    let months = 0;
    
    if (expiresIn.includes('months')) {
      months = parseInt(expiresIn.split(' ')[0], 10);
    } else if (expiresIn.includes('years') || expiresIn.includes('year')) {
      months = parseInt(expiresIn.split(' ')[0], 10) * 12;
    }
    
    today.setMonth(today.getMonth() + months);
    return today.toISOString().split('T')[0];
  };

  if (loading) return <div className="starter-items-loading">Loading starter items...</div>;
  if (error) return <div className="starter-items-error">{error}</div>;

  return (
    <div className="starter-items-container">
      <h2>Common Pantry Items</h2>
      <p>Click to select items you want to add to your inventory</p>
      
      <div className="starter-items-grid">
        {starterItems.map(item => (
          <div 
            className={`starter-item-card ${selectedItems[item.id] ? 'selected' : ''}`} 
            key={item.id}
            onClick={() => toggleItemSelection(item.id)}
          >
            <h3>{item.name}</h3>
            <p>Category: {item.category}</p>
            <p>{item.nonExpiring ? 'Non-expiring' : `Expires in: ${item.expiresIn}`}</p>
            <div className="selection-indicator">
              {selectedItems[item.id] ? '✓' : '+'}
            </div>
          </div>
        ))}
      </div>
      
      <button 
        className="add-selected-btn"
        onClick={addSelectedToInventory}
        disabled={Object.values(selectedItems).filter(Boolean).length === 0}
      >
        Add Selected Items
      </button>
    </div>
  );
}

export default StarterItems;