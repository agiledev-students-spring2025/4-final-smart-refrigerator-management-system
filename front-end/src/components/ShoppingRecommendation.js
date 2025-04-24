import React, { useState, useEffect } from "react";
import {Link, useNavigate} from "react-router-dom";
import "./Analytics.css";
import API_BASE_URL from "../api";

const ShoppingRecommendation = () => {
    const navigate = useNavigate();
    const [daysAhead, setDaysAhead] = useState(7);
    const [mustBuyItems, setMustBuyItems] = useState([]);
    const [replenishSuggestions, setReplenishSuggestions] = useState([]);

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await fetch(`${API_BASE_URL}/recommendations?daysAhead=${daysAhead}`,{
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
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
            <h1 style={{textAlign:"left"}}>Shopping Recommendation</h1>
            <div className="days-selector">
                <label>For next
                    <select value={daysAhead} onChange={(e) => setDaysAhead(Number(e.target.value))}>
                        <option value={7}>7</option>
                        <option value={14}>14</option>
                        <option value={30}>30</option>
                    </select> days
                </label>
            </div>

            <h3 style={{textAlign: "left", margin: 0}}>Must Buy Items:</h3>
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

            <h3 style={{textAlign: "left", margin: 0}}>Replenishment Suggestions:</h3>
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

            <Link to="/analytics" className="back-button">← Back to Analytics</Link>
            <button className="back-btn" onClick={() => navigate("/analytics")}>← Back to Analytics</button>
        </div>
    );
};

export default ShoppingRecommendation;