import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [totalItems, setTotalItems] = useState(0);
    const [expiringSoon, setExpiringSoon] = useState(0);
    const [analyticsLoaded, setAnalyticsLoaded] = useState(false);
    const [showFridgeEmptyMessage, setShowFridgeEmptyMessage] = useState(false);
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setUserName("Guest");
                return;
            }

            try {
                const res = await fetch("http://localhost:5001/api/profile", {
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

    useEffect(() => {
        fetch("http://localhost:5001/api/analytics")
            .then((res) => res.json())
            .then((data) => {
                setTotalItems(data.totalItems);
                setExpiringSoon(data.expiringSoon);
                setAnalyticsLoaded(true);
            })
            .catch((err) => {
                console.error("Error fetching analytics:", err);
                setAnalyticsLoaded(true);
            });
    }, []);

    useEffect(() => {
        setShowFridgeEmptyMessage(totalItems === 0);
    }, [totalItems]);

    useEffect(() => {
        fetch('http://localhost:5001/api/recipes')
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 'success') {
                    setRecipes(data.data);
                }
            })
            .catch((error) => console.error('Error fetching recipes:', error));
    }, []);

    return (
        <motion.div
            className="home-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <motion.div
                className="logo-container"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <img id="logo" src="/logo.svg" alt="Smart Fridge Logo" />
            </motion.div>

            <motion.h1
                className="welcome-message"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                Welcome, {userName || "Guest"}!
            </motion.h1>

            <motion.div
                className="fridge-summary"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
            >
                {analyticsLoaded && totalItems === 0 && showFridgeEmptyMessage && (
                    <div className="overlay">
                        <div className="overlay-card">
                            <p>Your fridge is empty！Add some food to get started!</p>
                            <button onClick={() => setShowFridgeEmptyMessage(false)}>Got it</button>
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
                        <Link to="/inventory" className="summary-button">View Inventory</Link>
                    </motion.div>

                    <motion.div
                        className="summary-card expiring-card"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h2>Expiring Soon</h2>
                        <p className="summary-number">{expiringSoon}</p>
                        <Link to="/analytics" className="summary-button">View Analytics</Link>
                    </motion.div>
                </div>
            </motion.div>

            <motion.div
                className="recipe-recommendations"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
            >
                <h2>Recipe Recommendations: </h2>
                <div className="recipe-grid">
                    {recipes.length > 0 ? (
                        recipes.map((recipe) => (
                            <motion.div
                                key={recipe._id}
                                className="recipe-item"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                            >
                                <img src={recipe.imageUrl || "https://picsum.photos/200"} alt={recipe.name} className="recipe-thumbnail" />
                                <p className="recipe-name">{recipe.name}</p>
                                <p className="recipe-time">Cook time: {recipe.time}</p>
                                <Link to={`/recipe/${recipe._id}`} className="recipe-time">
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