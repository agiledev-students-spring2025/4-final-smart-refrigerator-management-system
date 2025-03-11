import React from "react";
import { Link } from "react-router-dom";
import { useInventory } from "../contexts/InventoryContext";
import "./Analytics.css";

const Analytics = () => {
    const { getItemsByCompartment } = useInventory();
    const compartments = getItemsByCompartment();

    const getDaysUntilExpiration = (expiryDate) => {
        if (!expiryDate) return null;
        const today = new Date();
        const expiry = new Date(expiryDate);
        return Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    };

    let totalItems = 0;
    let expiringSoonCount = 0;
    let expiredCount = 0;

    // Count items & expiration stats
    Object.values(compartments).forEach((items) => {
        totalItems += items.length;
        items.forEach((item) => {
            const daysUntilExpiry = getDaysUntilExpiration(item.expiryDate);
            if (daysUntilExpiry !== null) {
                if (daysUntilExpiry < 0) expiredCount++;
                if (daysUntilExpiry >= 0 && daysUntilExpiry <= 3) expiringSoonCount++;
            }
        });
    });

    return (
        <div className="container">
            <h2>Analytics Dashboard</h2>

            {/* Summary Statistics */}
            <div className="summary-box">
                <p><strong>Total Items:</strong> {totalItems}</p>
                <p><strong>Expiring Soon (≤3 days):</strong> {expiringSoonCount}</p>
                <p><strong>Expired Items:</strong> {expiredCount}</p>
            </div>

            {/* Breakdown of Items by Compartment */}
            <section>
                <h3>Items by Compartment</h3>
                <div className="compartment-grid">
                    {Object.entries(compartments).map(([compartment, items]) => (
                        <div key={compartment} className="compartment-card">
                            <h4>{compartment.replace(/([A-Z])/g, " $1").trim()}</h4>
                            <p>{items.length} item(s)</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Navigation Links to Waste Pattern & Shopping Recommendations */}
            <div className="analytics-links">
                <Link to="/waste-pattern" className="analytics-btn">View Waste Pattern</Link>
                <Link to="/shopping-recommendation" className="analytics-btn">View Shopping Recommendations</Link>
            </div>
        </div>
    );
};

export default Analytics;