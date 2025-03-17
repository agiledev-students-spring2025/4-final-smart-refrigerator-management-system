import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useInventory } from "../contexts/InventoryContext";
import "./Home.css";

const Home = () => {
    const userName = "John White";
    const { getItemsByCompartment } = useInventory();
    const compartments = getItemsByCompartment();

    // Flatten all items from compartments
    const allItems = Object.values(compartments).flat();

    // Function to calculate days until expiration
    const getDaysUntilExpiration = (expiryDate) => {
        if (!expiryDate) return null;
        const today = new Date();
        const expiry = new Date(expiryDate);
        return Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    };

    // Get inventory stats
    const totalItems = allItems.length;
    const expiringSoonItems = allItems.filter(item => {
        const days = getDaysUntilExpiration(item.expiryDate);
        return days !== null && days <= 3;
    });

    return (
        <motion.div 
            className="home-container"
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6 }}
        >
            {/* Logo Animation */}
            <motion.div 
                className="logo-container"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <img id="logo" src="/logo.svg" alt="Smart Fridge Logo" />
            </motion.div>

            {/* Welcome Message */}
            <motion.h1 
                className="welcome-message"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                Welcome, {userName}!
            </motion.h1>

            <motion.div 
                className="fridge-summary"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
            >
                <h2>Your Fridge Activities:</h2>

                {/* Wrap cards in a new flex container */}
                <div className="summary-cards">
                    {/* Total Items Card */}
                    <motion.div 
                        className="summary-card"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h2>Total Items</h2>
                        <p className="summary-number">{totalItems}</p>
                        <Link to="/inventory" className="summary-button">View Inventory</Link>
                    </motion.div>

                    {/* Expiring Soon Card */}
                    <motion.div 
                        className="summary-card expiring-card"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h2>Expiring Soon</h2>
                        <p className="summary-number">{expiringSoonItems.length}</p>
                        <Link to="/analytics" className="summary-button">View Analytics</Link>
                    </motion.div>
                </div>
            </motion.div>


            {/* Recipe Recommendations */}
            <motion.div 
                className="recipe-recommendations"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
            >
                <h2>Recipe Recommendations: </h2>
                <div className="recipe-grid">
                    {["Shrimp Pasta", "Basil Pasta", "Pesto Pasta", "Tomato Pasta"].map((recipe, index) => (
                        <motion.div 
                            key={index} 
                            className="recipe-item"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                        >
                            <img src="https://picsum.photos/200" alt={recipe} className="recipe-thumbnail" />
                            <p className="recipe-name">{recipe}</p>
                            <p className="recipe-time">Cook time: 10 min</p>
                            {/* Add a Link to FullRecipe Page */}
                            <Link to="/full-recipe" className="recipe-time">
                                View Full Recipe
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Home;