import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate(); // ✅ To redirect if token is invalid
    const [userName, setUserName] = useState(""); // ✅ Dynamic name
    const [compartments, setCompartments] = useState({});


    // ✅ Fetch user profile on page load
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
                    setUserName(data.user.name); // ✅ Set dynamic name
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

    // Flatten all items from compartments
    const allItems = Object.values(compartments).flat();

    useEffect(() => {
        const fetchInventory = async () => {
            const token = localStorage.getItem("token");
    
            try {
                let res;
                if (token) {
                    // Authenticated user
                    res = await fetch("http://localhost:5001/api/items", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                } else {
                    // Guest mode
                    res = await fetch("http://localhost:5001/api/guest/starter");
                }
    
                if (res.ok) {
                    const data = await res.json();
                    // Group by compartment if needed
                    const grouped = data.data.reduce((acc, item) => {
                        const key = item.compartment || 'Uncategorized';
                        if (!acc[key]) acc[key] = [];
                        acc[key].push(item);
                        return acc;
                    }, {});
                    setCompartments(grouped);
                }
            } catch (err) {
                console.error("Error fetching inventory:", err);
            }
        };
    
        fetchInventory();
    }, []);
    

    // Function to calculate days until expiration
    const getDaysUntilExpiration = (item) => {
        const expiryDate = item.expiryDate || item.expirationDate;
        if (!expiryDate) return null;
        const today = new Date();
        const expiry = new Date(expiryDate);
        return Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    };

    

    // Get inventory stats
    const [showFridgeEmptyMessage, setShowFridgeEmptyMessage] = useState(false);
    const totalItems = allItems.length;    
    const expiringSoonItems = allItems.filter(item => {
        const days = getDaysUntilExpiration(item);
        return days !== null && days <= 3;
    });
    

    // State to store recipe data
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        setShowFridgeEmptyMessage(totalItems === 0);
    }, [totalItems]);
    

    // Fetch recipe data from backend
    useEffect(() => {
        fetch('http://localhost:5001/api/recipes') // This URL assumes your backend serves recipes here
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 'success') {
                    setRecipes(data.data);  // Assuming `data.data` is the array of recipes
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
                Welcome, {userName || "Guest"}!
            </motion.h1>

            <motion.div 
                className="fridge-summary"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
            >

            {showFridgeEmptyMessage && (
            <div className="overlay">
                <div className="overlay-card">
                <p>Your fridge is empty！Add some food to get started!</p>
                <button onClick={() => setShowFridgeEmptyMessage(false)}>Got it</button>
                </div>
            </div>
            )}

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
                                {/* Add a Link to FullRecipe Page */}
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
