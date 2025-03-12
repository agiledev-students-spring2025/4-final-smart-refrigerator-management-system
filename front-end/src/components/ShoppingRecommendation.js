import React, { useState } from "react";
import { useInventory } from "../contexts/InventoryContext";
import "./Analytics.css";

const ShoppingRecommendation = () => {
    const { getItemsByCompartment } = useInventory();
    const compartments = getItemsByCompartment();

    const [daysAhead, setDaysAhead] = useState(7); // Default: 7 days

    // Helper function: Calculate days until expiration
    const getDaysUntilExpiration = (expiryDate) => {
        if (!expiryDate) return null;
        const today = new Date();
        const expiry = new Date(expiryDate);
        return Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    };

    // Get all items from compartments
    const allItems = Object.values(compartments).flat();

    // Must-Buy Items: Expiring within selected days ahead
    const mustBuyItems = allItems.filter((item) => {
        const daysUntilExpiry = getDaysUntilExpiration(item.expiryDate);
        return daysUntilExpiry !== null && daysUntilExpiry <= daysAhead && daysUntilExpiry >= 0;
    });

    // Replenishment Suggestions: Expiring 7 days *after* the selected period
    const replenishSuggestions = allItems.filter((item) => {
        const daysUntilExpiry = getDaysUntilExpiration(item.expiryDate);
        return daysUntilExpiry !== null && daysUntilExpiry > daysAhead && daysUntilExpiry <= daysAhead + 7;
    });

    return (
        <div className="container">
            <h2>Shopping Recommendation</h2>

            {/* Days selection dropdown */}
            <div className="days-selector">
                <label>For next
                    <select value={daysAhead} onChange={(e) => setDaysAhead(Number(e.target.value))}>
                        <option value={7}>7</option>
                        <option value={14}>14</option>
                        <option value={30}>30</option>
                    </select> days
                </label>
            </div>

            {/* Must-Buy Items */}
            <h3>Must-Buy Items:</h3>
            <ul>
                {mustBuyItems.length === 0 ? <p>No items expiring soon.</p> :
                    mustBuyItems.map((item) => <li key={item.id}>{item.name} (Expires in {getDaysUntilExpiration(item.expiryDate)} days)</li>)
                }
            </ul>

            {/* Replenishment Suggestions */}
            <h3>Replenishment Suggestions:</h3>
            <ul>
                {replenishSuggestions.length === 0 ? <p>No items expiring in the following 7 days.</p> :
                    replenishSuggestions.map((item) => <li key={item.id}>{item.name} (Expires in {getDaysUntilExpiration(item.expiryDate)} days)</li>)
                }
            </ul>

            {/* Direct Shopping Links */}
            <button className="shop-btn" onClick={() => window.open("https://www.amazon.com", "_blank")}>Directed to Amazon</button>
            <button className="shop-btn" onClick={() => window.open("https://www.ubereats.com", "_blank")}>Directed to Uber Eats</button>
        </div>
    );
};

export default ShoppingRecommendation;