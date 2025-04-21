import React, { createContext, useState, useEffect, useContext } from 'react';

const InventoryContext = createContext();

export const useInventory = () => useContext(InventoryContext);

export const InventoryProvider = ({ children }) => {
  const [inventory, setInventory] = useState([]);
  const [isGuest, setIsGuest] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = 'http://localhost:5001/api';

    useEffect(() => {
      const fetchInventory = async () => {
        setLoading(true);
        const token = localStorage.getItem('token');
        let endpoint;
        let options = {};
    
        if (token) {
          endpoint = 'http://localhost:5001/api/items';
          options.headers = { Authorization: `Bearer ${token}` };
          setIsGuest(false);
        } else {
          endpoint = 'http://localhost:5001/api/guest/starter';
          setIsGuest(true);
        }
    
        try {
          const res = await fetch(endpoint, options);
          if (res.ok) {
            const data = await res.json();
            setInventory(data.data || []);
            setError(null);
          } else {
            throw new Error("Failed to fetch inventory");
          }
        } catch (error) {
          console.warn('Backend fetch failed. Falling back to localStorage.');
          setError('Failed to load inventory from server');
          const savedInventory = localStorage.getItem('foodInventory');
          if (savedInventory) {
            try {
              setInventory(JSON.parse(savedInventory));
            } catch (error) {
              console.error('Error parsing fallback inventory:', error);
              setInventory([]);
            }
          }
        }finally {
          setLoading(false);
        }
      };
    
      fetchInventory();
    }, []);    

  const addItem = async (itemData) => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        const newItem = {
          ...itemData,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
        };
        const updatedInventory = [...inventory, newItem];
        setInventory(updatedInventory);
        localStorage.setItem('foodInventory', JSON.stringify(updatedInventory)); 
        return newItem;
      }

      const response = await fetch(`http://localhost:5001/api/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(itemData)
      });
      
      if (!response.ok) {
        throw new Error('Failed to add item to database');
      }
      
      const result = await response.json();
      const newItem = result.data;
      setInventory(prev => [...prev, newItem]);
      return newItem;
    } catch (err) {
      console.error('Error adding item:', err);
      setError('Failed to add item. Please try again.');
      return null;
    }
  };
  
  const updateItem = async (id, updatedData) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setInventory(prev => 
          prev.map(item => (item.id === id) ? { ...item, ...updatedData } : item)
        );
        localStorage.setItem('foodInventory', JSON.stringify(
          inventory.map(item => (item.id === id) ? { ...item, ...updatedData } : item)
        ));
        return true;
      }
      const response = await fetch(`http://localhost:5001/api/items/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(updatedData)
      });

      if (!response.ok) {
        throw new Error('Failed to update item in database');
      }

      const result = await response.json();
      setInventory(prev =>
        prev.map(item => (item._id === id) ? result.data : item)
      );
      return true;
    } catch (err) {
      console.error('Error updating item:', err);
      setError('Failed to update item. Please try again.');
      return false;
    }
  };
  
  const deleteItem = async (id) => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        const filteredInventory = inventory.filter(item => item.id !== id);
        setInventory(filteredInventory);
        localStorage.setItem('foodInventory', JSON.stringify(filteredInventory));
        return true;
      }
      
      const response = await fetch(`http://localhost:5001/api/items/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete item from database');
      }
      
      setInventory(prev => prev.filter(item => item._id !== id));
      return true;
    } catch (err) {
      console.error('Error deleting item:', err);
      setError('Failed to delete item. Please try again.');
      return false;
    }
  };
  
  const getItemById = (id) => {
    return inventory.find(item => item._id === id || item.id === id) || null;
  };
  
  const getItemsByCompartment = () => {
    const grouped = {};
    
    inventory.forEach(item => {
      const compartment = item.storageLocation || 'other';
      if (!grouped[compartment]) {
        grouped[compartment] = [];
      }
      grouped[compartment].push(item);
    });
    
    return grouped;
  };
  
  const isLoading = () => loading;
  const clearError = () => setError(null);

  return (
    <InventoryContext.Provider
      value={{
        inventory,
        loading,
        error,
        isGuest,
        addItem,
        updateItem,
        deleteItem,
        getItemById,
        getItemsByCompartment,
        isLoading,
        clearError
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

export { InventoryContext };