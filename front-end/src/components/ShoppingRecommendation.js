import React, { useState } from "react";
import { useInventory } from "../contexts/InventoryContext";
import { useNavigate } from "react-router-dom";
import "./Analytics.css";

const ShoppingRecommendation = () => {
    const navigate = useNavigate();
    const { getItemsByCompartment } = useInventory();
    const compartments = getItemsByCompartment();
    const [daysAhead, setDaysAhead] = useState(7);

    const getDaysUntilExpiration = (expiryDate) => {
        if (!expiryDate) return null;
        const today = new Date();
        const expiry = new Date(expiryDate);
        return Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    };

    const allItems = Object.values(compartments).flat();
    const mustBuyItems = allItems.filter((item) => {
        const daysUntilExpiry = getDaysUntilExpiration(item.expiryDate);
        return daysUntilExpiry !== null && daysUntilExpiry <= daysAhead && daysUntilExpiry >= 0;
    });

    const replenishSuggestions = allItems.filter((item) => {
        const daysUntilExpiry = getDaysUntilExpiration(item.expiryDate);
        return daysUntilExpiry !== null && daysUntilExpiry > daysAhead && daysUntilExpiry <= daysAhead + 7;
    });

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
                {mustBuyItems.length === 0 ? <p>No items expiring soon.</p> :
                    mustBuyItems.map((item) => <li key={item.id}>{item.name} (Expires in {getDaysUntilExpiration(item.expiryDate)} days)</li>)
                }
            </ul>
            <h3>Replenishment Suggestions:</h3>
            <ul>
                {replenishSuggestions.length === 0 ? <p>No items expiring in the following 7 days.</p> :
                    replenishSuggestions.map((item) => <li key={item.id}>{item.name} (Expires in {getDaysUntilExpiration(item.expiryDate)} days)</li>)
                }
            </ul>
            <button className="shop-btn" onClick={() => window.open("https://www.amazon.com", "_blank")}>Directed to Amazon</button>
            <button className="shop-btn" onClick={() => window.open("https://www.ubereats.com", "_blank")}>Directed to Uber Eats</button>

            {/* Back to Analytics Button */}
            <button className="back-btn" onClick={() => navigate("/analytics")}>← Back to Analytics</button>
        </div>
    );
};

export default ShoppingRecommendation;