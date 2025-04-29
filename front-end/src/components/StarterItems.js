import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './StarterItems.css';
import { useInventory } from '../contexts/InventoryContext';
import API_BASE_URL from '../api';

function StarterItems() {
  const [starterItems, setStarterItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItems, setSelectedItems] = useState({});
  const navigate = useNavigate();
  const { addItem } = useInventory();

  useEffect(() => {
    const commonItems = [
      {
        id: 'salt1',
        name: 'Salt',
        category: 'condiments',
        quantity: '1 container',
        nonExpiring: true
      },
      {
        id: 'pepper1',
        name: 'Black Pepper',
          category: 'condiments',
        quantity: '1 container',
        nonExpiring: true
      },
      {
        id: 'sugar1',
        name: 'Sugar',
        category: 'other',
        quantity: '1 bag',
        nonExpiring: true
      },
      {
        id: 'flour1',
        name: 'Flour',
        category: 'other',
        quantity: '1 bag',
        expiresIn: '12 months'
      },
      {
        id: 'oil1',
        name: 'Olive Oil',
        category: 'condiments',
        quantity: '1 bottle',
        expiresIn: '24 months'
      },
      {
        id: 'vinegar1',
        name: 'Vinegar',
        category: 'condiments',
        quantity: '1 bottle',
        nonExpiring: true
      },
      {
        id: 'rice1',
        name: 'Rice',
        category: 'other',
        quantity: '1 bag',
        expiresIn: '24 months'
      },
      {
        id: 'pasta1',
        name: 'Pasta',
        category: 'other',
        quantity: '1 box',
        expiresIn: '24 months'
      },
      {
        id: 'canned_beans1',
        name: 'Canned Beans',
        category: 'other',
        quantity: '1 can',
        expiresIn: '24 months'
      },
      {
        id: 'baking_soda1',
        name: 'Baking Soda',
        category: 'other',
        quantity: '1 box',
        nonExpiring: true
      },
      {
        id: 'baking_powder1',
        name: 'Baking Powder',
        category: 'other',
        quantity: '1 container',
        expiresIn: '18 months'
      },
      {
        id: 'soy_sauce1',
        name: 'Soy Sauce',
        category: 'condiments',
        quantity: '1 bottle',
        expiresIn: '24 months'
      }
    ];

    setStarterItems(commonItems);
    setLoading(false);
  }, []);

  const toggleItemSelection = (itemId) => {
    setSelectedItems(prevState => ({
      ...prevState,
      [itemId]: !prevState[itemId]
    }));
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

  const addSelectedToInventory = async () => {
    const itemsToAdd = starterItems.filter(item => selectedItems[item.id]);
    
    if (itemsToAdd.length === 0) {
      alert('Please select items to add first');
      return;
    }

    try {
      const promises = itemsToAdd.map(item => {
        const newItem = {
          name: item.name,
          category: item.category,
          quantity: item.quantity || '1 item',
          expirationDate: item.nonExpiring ? null : calculateExpirationDate(item.expiresIn),
          nonExpiring: item.nonExpiring || false,
          storageLocation: 'main'
        };
        
        return addItem(newItem);
      });
      
      await Promise.all(promises);
      alert(`Added ${itemsToAdd.length} items to your inventory!`);
      navigate('/inventory');
    } catch (error) {
      setError('Failed to add items: ' + error.message);
    }
  };

  if (loading) return <div className="starter-items-loading">Loading starter items...</div>;
  if (error) return <div className="starter-items-error">{error}</div>;

  return (
    <div className="starter-items-container">
      <h2>Common Pantry Items</h2>
      <p>Select items you want to add to your inventory</p>
      
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