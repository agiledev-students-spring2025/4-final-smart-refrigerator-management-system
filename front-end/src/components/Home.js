import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
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
    
    // Mock recipe suggestion based on items in fridge
    const suggestedRecipe = {
        name: "Veggie Omelet",
        availableIngredients: ["Eggs", "Spinach", "Cheese"],
        missingIngredients: ["Bell Peppers"],
        image: "https://picsum.photos/seed/omelet/300/200"
    };

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

            {/* Smart Summary Cards */}
            <div className="summary-cards">
                <Link to="/inventory" className="summary-card">
                    <h3>Items in Fridge</h3>
                    <p>{totalItems} Items Left</p>
                </Link>
                <Link to="/analytics" className="summary-card">
                    <h3>Expiring Soon</h3>
                    <p>{expiringSoonItems.length} Items Expiring</p>
                </Link>
                <Link to="/recipes" className="summary-card">
                    <h3>Suggested Recipes</h3>
                    <p>5 Available</p>
                </Link>
            </div>

            {/* Expiring Soon List */}
            <div className="expiring-soon-section">
                <h2>Expiring Soon</h2>
                {expiringSoonItems.length === 0 ? (
                    <p>No items expiring soon! </p>
                ) : (
                    <ul className="expiring-list">
                        {expiringSoonItems.map(item => (
                            <li key={item.id} className="expiring-item">
                                <span>{item.name} - {getDaysUntilExpiration(item.expiryDate)} days left</span>
                                <button className="use-button">Use</button>
                                <button className="recipe-button">Find Recipe</button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Recommended Recipe */}
            <div className="recipe-section">
                <h2>Recommended Recipe of the Day</h2>
                <div className="recipe-card">
                    <img src={suggestedRecipe.image} alt={suggestedRecipe.name} className="recipe-image" />
                    <div className="recipe-details">
                        <h3>{suggestedRecipe.name}</h3>
                        <p>Ingredients you have: {suggestedRecipe.availableIngredients.join(", ")}</p>
                        <p>Missing: {suggestedRecipe.missingIngredients.join(", ")}</p>
                        <Link to="/recipes" className="recipe-button"> View Full Recipe</Link>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Home;
