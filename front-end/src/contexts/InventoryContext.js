import React, { createContext, useState, useEffect, useContext } from 'react';

const InventoryContext = createContext();

export const useInventory = () => useContext(InventoryContext);

export const InventoryProvider = ({ children }) => {
  const [inventory, setInventory] = useState([]);
  const [isGuest, setIsGuest] = useState(false);

    // ✅ Fetch from backend on mount
    useEffect(() => {
      const fetchInventory = async () => {
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
          } else {
            throw new Error("Fetch failed");
          }
        } catch (error) {
          console.warn('Backend fetch failed. Falling back to localStorage.');
          const savedInventory = localStorage.getItem('foodInventory');
          if (savedInventory) {
            try {
              setInventory(JSON.parse(savedInventory));
            } catch (error) {
              console.error('Error parsing fallback inventory:', error);
              setInventory([]);
            }
          }
        }
      };
    
      fetchInventory();
    }, []);    

  const addItem = (item) => {
    const newItem = {
      ...item,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    const updated = [...inventory, newItem];
    setInventory(updated);
    localStorage.setItem('foodInventory', JSON.stringify(updated)); 
    return newItem;
  };
  
  const updateItem = (id, updatedData) => {
    setInventory(prev => 
      prev.map(item => item.id === id ? { ...item, ...updatedData } : item)
    );
  };
  
  const deleteItem = (id) => {
    setInventory(prev => prev.filter(item => item.id !== id));
  };
  
  const getItemById = (id) => {
    return inventory.find(item => item.id === id) || null;
  };
  
  const getItemsByCompartment = () => {
    const grouped = {};
    
    inventory.forEach(item => {
      const compartment = item.compartment || 'other';
      if (!grouped[compartment]) {
        grouped[compartment] = [];
      }
      grouped[compartment].push(item);
    });
    
    return grouped;
  };
  
  return (
    <InventoryContext.Provider
      value={{
        inventory,
        addItem,
        updateItem,
        deleteItem,
        getItemById,
        getItemsByCompartment
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

export { InventoryContext };