import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import API_BASE_URL from "../api";

const InventoryContext = createContext();
export const useInventory = () => useContext(InventoryContext);

export const InventoryProvider = ({ children }) => {
  const [inventory, setInventory] = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState(null);

  /* ─────────────────────────────
     INITIAL LOAD
  ───────────────────────────── */
  useEffect(() => {
    const fetchInventory = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setInventory([]);
        setError("No auth token found.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API_BASE_URL}/items`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch inventory");

        const data = await res.json();
        setInventory(data.data || []);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Could not load inventory.");
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, []);               // ← no navigate dependency

  /* ─────────────────────────────
     CRUD HELPERS
  ───────────────────────────── */
  const addItem = async (itemData) => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
      const res = await fetch(`${API_BASE_URL}/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(itemData),
      });

      if (!res.ok) throw new Error("Failed to add item");

      const { data: newItem } = await res.json();
      setInventory(prev => [...prev, newItem]);
      return newItem;
    } catch (err) {
      console.error(err);
      setError("Could not add item.");
      return null;
    }
  };

  const updateItem = async (id, updatedData) => {
    const token = localStorage.getItem("token");
    if (!token) return false;

    try {
      const res = await fetch(`${API_BASE_URL}/items/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (!res.ok) throw new Error("Failed to update item");

      const { data: updatedItem } = await res.json();
      setInventory(prev =>
        prev.map(item => (item._id === id ? updatedItem : item))
      );
      return true;
    } catch (err) {
      console.error(err);
      setError("Could not update item.");
      return false;
    }
  };

  const deleteItem = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) return false;

    try {
      const res = await fetch(`${API_BASE_URL}/items/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to delete item");

      setInventory(prev => prev.filter(item => item._id !== id));
      return true;
    } catch (err) {
      console.error(err);
      setError("Could not delete item.");
      return false;
    }
  };

  /* ─────────────────────────────
     UTILITY HELPERS
  ───────────────────────────── */
  const getItemById = id =>
    inventory.find(item => item._id === id) || null;

  const getItemsByCompartment = () =>
    inventory.reduce((groups, item) => {
      const key = item.storageLocation || "other";
      if (!groups[key]) groups[key] = [];
      groups[key].push(item);
      return groups;
    }, {});

  /* ───────────────────────────── */

  return (
    <InventoryContext.Provider
      value={{
        inventory,
        loading,
        error,
        addItem,
        updateItem,
        deleteItem,
        getItemById,
        getItemsByCompartment,
        clearError: () => setError(null),
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};
