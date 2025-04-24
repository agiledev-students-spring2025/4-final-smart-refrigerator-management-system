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
  /* ───── auth token state ───── */
  const readToken      = () => localStorage.getItem("token");
  const [token, setToken] = useState(readToken());

  /* update token if localStorage changes (same tab or other tab) */
  useEffect(() => {
    const sync = () => setToken(readToken());
    window.addEventListener("storage", sync);      // other tabs
    window.addEventListener("tokenChanged", sync); // same tab (custom)
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("tokenChanged", sync);
    };
  }, []);

  /* ───── inventory state ───── */
  const [inventory, setInventory] = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState(null);

  /* (re)load whenever token changes */
  useEffect(() => {
    const load = async () => {
      if (!token) {
        setInventory([]);
        setError("No auth token.");
        setLoading(false);
        return;
      }

      setLoading(true);
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

    load();
  }, [token]);

  /* ───── CRUD helpers (unchanged) ───── */
  const addItem = async (itemData) => {
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
      if (!res.ok) throw new Error();
      const { data: newItem } = await res.json();
      setInventory((prev) => [...prev, newItem]);
      return newItem;
    } catch (err) {
      console.error(err);
      setError("Could not add item.");
      return null;
    }
  };

  const updateItem = async (id, updated) => {
    if (!token) return false;
    try {
      const res = await fetch(`${API_BASE_URL}/items/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updated),
      });
      if (!res.ok) throw new Error();
      const { data } = await res.json();
      setInventory((prev) =>
        prev.map((it) => (it._id === id ? data : it))
      );
      return true;
    } catch (err) {
      console.error(err);
      setError("Could not update item.");
      return false;
    }
  };

  const deleteItem = async (id) => {
    if (!token) return false;
    try {
      const res = await fetch(`${API_BASE_URL}/items/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error();
      setInventory((prev) => prev.filter((it) => it._id !== id));
      return true;
    } catch (err) {
      console.error(err);
      setError("Could not delete item.");
      return false;
    }
  };

  /* ───── helpers ───── */
  const getItemById = (id) => inventory.find((i) => i._id === id) || null;

  const getItemsByCompartment = () =>
    inventory.reduce((grp, item) => {
      const key = item.storageLocation || "other";
      (grp[key] = grp[key] || []).push(item);
      return grp;
    }, {});

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
