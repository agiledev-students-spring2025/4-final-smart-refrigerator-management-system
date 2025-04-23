import React, { useState, useEffect, useCallback } from 'react';
import FrequentItems from './FrequentItems';
import API_BASE_URL from '../api';

function cFrequentItems() {
  const [frequentItems, setFrequentItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addedItems, setAddedItems] = useState({});
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const fetchFrequentItems = useCallback(() => {
    setLoading(true);
    fetch(`${API_BASE_URL}/items/frequent`)
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

  useEffect(() => {
    fetchFrequentItems();
  }, [fetchFrequentItems, refreshTrigger]);

  const handleQuickAdd = useCallback((item) => {
    fetch(`${API_BASE_URL}/items/quick-add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        itemId: item.id,
        quantity: item.quantity
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to add item');
        }
        return response.json();
      })
      .then(data => {
        setAddedItems(prev => ({
          ...prev,
          [item.id]: true
        }));
        
        setTimeout(() => {
          setAddedItems(prev => ({
            ...prev,
            [item.id]: false
          }));
        }, 3000);

      })
      .catch(error => {
        setError('Failed to add item: ' + error.message);
      });
  }, []);

  const refreshList = useCallback(() => {
    setRefreshTrigger(prev => prev + 1);
  }, []);

  const frequentItemsProps = {
    frequentItems,
    loading,
    error,
    addedItems,
    onQuickAdd: handleQuickAdd,
    onRefresh: refreshList
  };

  return <FrequentItems {...frequentItemsProps} />;
}

export default cFrequentItems;