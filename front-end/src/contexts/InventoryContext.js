import React, { createContext, useState, useEffect, useContext } from 'react';

const InventoryContext = createContext();

export const useInventory = () => useContext(InventoryContext);

export const InventoryProvider = ({ children }) => {
  const [inventory, setInventory] = useState([]);
  
  useEffect(() => {
    const savedInventory = localStorage.getItem('foodInventory');
    if (savedInventory) {
      try {
        setInventory(JSON.parse(savedInventory));
      } catch (error) {
        console.error('Error parsing inventory from localStorage:', error);
        setInventory([]);
      }
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem('foodInventory', JSON.stringify(inventory));
  }, [inventory]);
  
  const addItem = (item) => {
    const newItem = {
      ...item,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setInventory(prev => [...prev, newItem]);
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