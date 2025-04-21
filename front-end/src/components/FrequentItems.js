import React, { useState, useEffect } from 'react';
import './FrequentItems.css';

function FrequentItems() {
  const [frequentItems, setFrequentItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addedItems, setAddedItems] = useState({});

  useEffect(() => {
    fetch('http://localhost:5001/api/items/frequent')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setFrequentItems(data.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Failed to load frequent items: ' + error.message);
        setLoading(false);
      });
  }, []);

  const handleQuickAdd = (item) => {
    fetch('http://localhost:5001/api/items/quick-add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        itemId: item.id,
        quantity: item.quantity
      }),
    })
      .then(response => response.json())
      .then(data => {
        setAddedItems({
          ...addedItems,
          [item.id]: true
        });
        
        setTimeout(() => {
          setAddedItems({
            ...addedItems,
            [item.id]: false
          });
        }, 3000);
      })
      .catch(error => {
        setError('Failed to add item: ' + error.message);
      });
  };

  if (loading) return <div className="frequent-items-loading">Loading frequent items...</div>;
  if (error) return <div className="frequent-items-error">{error}</div>;

  return (
    <div className="frequent-items-container">
      <h2>Frequent Items</h2>
      <p>Quickly add items you purchase regularly</p>
      
      <div className="frequent-items-grid">
        {frequentItems.map(item => (
          <div className="frequent-item-card" key={item.id}>
            <div className="item-details">
              <h3>{item.name}</h3>
              <p>Usual quantity: {item.quantity}</p>
              <p>Frequency: {item.frequency}</p>
            </div>
            <button 
              className={`quick-add-btn ${addedItems[item.id] ? 'added' : ''}`}
              onClick={() => handleQuickAdd(item)}
              disabled={addedItems[item.id]}
            >
              {addedItems[item.id] ? 'Added!' : 'Quick Add'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FrequentItems;