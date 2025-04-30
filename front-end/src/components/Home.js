import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useInventory } from "../contexts/InventoryContext";
import "./Home.css";
import API_BASE_URL from "../api";

const Home = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [showStarterItemsPrompt, setShowStarterItemsPrompt] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setUserName("Guest");
        return;
      }

      try {
        const res = await fetch(`${API_BASE_URL}/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setUserName(data.user.name);
        } else {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    fetchUserProfile();
  }, [navigate]);

  /* ───────────────────────
      Inventory statistics
  ─────────────────────── */
  const { inventory, loading } = useInventory();
  const [expiringSoon, setExpiringSoon] = useState(0);

  useEffect(() => {
    const today = new Date();
    const soon = new Date();
    soon.setDate(today.getDate() + 7);

    const countSoon = inventory.filter(
      (item) =>
        item.expirationDate &&
        new Date(item.expirationDate) >= today &&
        new Date(item.expirationDate) <= soon
    ).length;

    setExpiringSoon(countSoon);
  }, [inventory]);

  const totalItems = inventory.length;

  /* ───────────────────────
      Empty-fridge overlay
  ─────────────────────── */
  const [showEmptyMsg, setShowEmptyMsg] = useState(false);

  useEffect(() => {
    if (totalItems === 0 && !loading) {
      setShowEmptyMsg(true);
      setShowStarterItemsPrompt(true);
    } else {
      setShowEmptyMsg(false);
      setShowStarterItemsPrompt(false);
    }
  }, [totalItems, loading]);

  /* ───────────────────────
      Recipe recommendations
  ─────────────────────── */
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    fetch(`${API_BASE_URL}/recipes`)
      .then((r) => r.json())
      .then((data) => {
        if (data.status === "success") {
          const filteredRecipes = data.data.filter((recipe) => {
            // Check if any ingredient in the recipe exists in the fridge
            return recipe.ingredients.some((ingredient) =>
              inventory.some((item) => item.name.toLowerCase() === ingredient.name.toLowerCase())
            );
          });
          setRecipes(filteredRecipes);
        }
      })
      .catch((e) => console.error("Error fetching recipes:", e));
  }, [inventory]);

  /* ───────────────────────
     UI
  ─────────────────────── */
  return (
    <motion.div
      className="home-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* logo */}
      <motion.div
        className="logo-container"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <img id="logo" src="/logo.svg" alt="Smart Fridge Logo" />
      </motion.div>

      {/* greeting */}
      <motion.h1
        className="welcome-message"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        Welcome, {userName}!
      </motion.h1>

      {/* fridge summary */}
      <motion.div
        className="fridge-summary"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {loading ? null : showEmptyMsg && (
          <div className="overlay">
            <div className="overlay-card">
              <p>Your fridge is empty! Would you like to add some common items?</p>
              <button onClick={() => navigate("/starter-items")} className="starter-items-button">Add Starter Items</button>
              <button onClick={() => setShowEmptyMsg(false)} className="close-button">Not Now</button>
            </div>
          </div>
        )}

        <h2>Your Fridge Activities:</h2>
        <div className="summary-cards">
          <motion.div
            className="summary-card"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <h2>Total Items</h2>
            <p className="summary-number">{totalItems}</p>
            <Link to="/inventory" className="summary-button">
              View Inventory
            </Link>
          </motion.div>

          <motion.div
            className="summary-card expiring-card"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <h2>Expiring Soon</h2>
            <p className="summary-number">{expiringSoon}</p>
            <Link to="/analytics" className="summary-button">
              View Analytics
            </Link>
          </motion.div>
        </div>

        {showStarterItemsPrompt && (
          <motion.div
            className="starter-items-prompt"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Link to="/starter-items" className="starter-items-link">
              Add Common Items to Your Inventory
            </Link>
          </motion.div>
        )}
      </motion.div>

      {/* recipe recommendations */}
      <motion.div
        className="recipe-recommendations"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h2>Recipe Recommendations:</h2>
        <div className="recipe-grid">
          {recipes.length ? (
            recipes.slice(0, 4).map((r) => (
              <motion.div
                key={r._id}
                className="recipe-item"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={r.imageUrl || "https://picsum.photos/200"}
                  alt={r.name}
                  className="recipe-thumbnail"
                />
                <p className="recipe-name">{r.name}</p>
                <p className="recipe-time">Cook time: {r.time}</p>
                <Link to={`/recipe/${r._id}`} className="recipe-time">
                  View Full Recipe
                </Link>
              </motion.div>
            ))
          ) : (
            <p>No recipe recommendations found.</p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Home;
