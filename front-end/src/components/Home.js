import React from "react";
import { motion } from "framer-motion";
import "./Home.css";

const Home = () => {
    const userName = "John White";

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
                Welcome {userName}!
            </motion.h1>

            {/* Fridge Activity Section with Background Card */}
            <motion.div 
                className="fridge-card"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
            >
                <h2>Your Fridge Activity</h2>
                <div className="activity-item">
                    <img src="https://picsum.photos/200" alt="Food category" className="activity-icon" />
                    <p>Moderate (50% used)</p>
                </div>
                <div className="activity-item">
                    <img src="https://picsum.photos/200" alt="Food category" className="activity-icon" />
                    <p>Needs attention (80% used)</p>
                </div>
            </motion.div>

            {/* Recipe Recommendations */}
            <motion.div 
                className="recipe-recommendations"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
            >
                <h2>Our Recommendations</h2>
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
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Home;