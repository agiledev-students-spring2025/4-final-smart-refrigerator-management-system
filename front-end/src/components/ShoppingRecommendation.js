import React, { useState } from "react";
import { useInventory } from "../contexts/InventoryContext";
import "./Analytics.css";

const ShoppingRecommendation = () => {
    const { getItemsByCompartment } = useInventory();
    const compartments = getItemsByCompartment();

    const [daysAhead, setDaysAhead] = useState(7);

    // Identify low-stock items for must-buy list
    const mustBuyItems = [];
    Object.values(compartments).forEach((items) => {
        items.forEach((item) => {
            if (item.quantity && item.quantity <= 2) {
                mustBuyItems.push(item);
            }
        });
    });

    // Identify expired or wasted items for replenishment suggestions
    const replenishSuggestions = [];
    Object.values(compartments).forEach((items) => {
        items.forEach((item) => {
            const expiryDate = new Date(item.expiryDate);
            if (expiryDate < new Date()) {
                replenishSuggestions.push(item);
            }
        });
    });

    return (
        <div className="container">
            <h2>Shopping Recommendation</h2>

            {/* Days selection dropdown */}
            <div className="days-selector">
                <label>For next
                    <select value={daysAhead} onChange={(e) => setDaysAhead(e.target.value)}>
                        <option value={7}>7</option>
                        <option value={14}>14</option>
                        <option value={30}>30</option>
                    </select> days
                </label>
            </div>

            {/* Must-Buy Items */}
            <h3>Must-Buy Items:</h3>
            <ul>
                {mustBuyItems.length === 0 ? <p>No immediate restocking needed.</p> :
                    mustBuyItems.map((item) => <li key={item.id}>{item.name} (Qty: {item.quantity})</li>)
                }
            </ul>

            {/* Replenishment Suggestions */}
            <h3>Replenishment Suggestions:</h3>
            <ul>
                {replenishSuggestions.length === 0 ? <p>No expired items to replenish.</p> :
                    replenishSuggestions.map((item) => <li key={item.id}>{item.name}</li>)
                }
            </ul>

            {/* Direct Shopping Links */}
            <button className="shop-btn" onClick={() => window.open("https://www.amazon.com", "_blank")}>Directed to Amazon</button>
            <button className="shop-btn" onClick={() => window.open("https://www.ubereats.com", "_blank")}>Directed to Uber Eats</button>
        </div>
    );
};

export default ShoppingRecommendation;