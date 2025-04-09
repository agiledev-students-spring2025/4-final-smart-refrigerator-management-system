import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Analytics.css";

const ShoppingRecommendation = () => {
    const navigate = useNavigate();
    const [daysAhead, setDaysAhead] = useState(7);
    const [mustBuyItems, setMustBuyItems] = useState([]);
    const [replenishSuggestions, setReplenishSuggestions] = useState([]);

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const res = await fetch(`http://localhost:5001/api/recommendations?daysAhead=${daysAhead}`);
                const data = await res.json();
                setMustBuyItems(data.mustBuy || []);
                setReplenishSuggestions(data.replenish || []);
            } catch (err) {
                console.warn("Backend not available – showing empty recs.");
                setMustBuyItems([]);
                setReplenishSuggestions([]);
            }
        };

        fetchRecommendations();
    }, [daysAhead]);

    return (
        <div className="container">
            <h2>Shopping Recommendation</h2>
            <div className="days-selector">
                <label>For next
                    <select value={daysAhead} onChange={(e) => setDaysAhead(Number(e.target.value))}>
                        <option value={7}>7</option>
                        <option value={14}>14</option>
                        <option value={30}>30</option>
                    </select> days
                </label>
            </div>

            <h3>Must-Buy Items:</h3>
            <ul>
                {mustBuyItems.length === 0 ? (
                    <p className="center-text">No items expiring soon.</p>
                ) : (
                    mustBuyItems.map((item, idx) => (
                        <li key={idx}>
                            {item.name} (Expires in {item.daysUntilExpiration} days)
                        </li>
                    ))
                )}
            </ul>

            <h3>Replenishment Suggestions:</h3>
            <ul>
                {replenishSuggestions.length === 0 ? (
                    <p className="center-text">No Suggestions</p>
                ) : (
                    replenishSuggestions.map((item, idx) => (
                        <li key={idx}>
                            {item.name} (Expires in {item.daysUntilExpiration} days)
                        </li>
                    ))
                )}
            </ul>

            <button className="shop-btn" onClick={() => window.open("https://www.amazon.com", "_blank")}>Directed to Amazon</button>
            <button className="shop-btn" onClick={() => window.open("https://www.ubereats.com", "_blank")}>Directed to Uber Eats</button>

            <button className="back-btn" onClick={() => navigate("/analytics")}>← Back to Analytics</button>
        </div>
    );
};

export default ShoppingRecommendation;