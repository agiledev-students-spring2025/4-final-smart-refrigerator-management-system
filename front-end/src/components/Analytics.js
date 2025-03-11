import React from "react";
import { Link } from "react-router-dom";
import { useInventory } from "../contexts/InventoryContext";
import "./Analytics.css";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";

const Analytics = () => {
    const { getItemsByCompartment } = useInventory();
    const compartments = getItemsByCompartment();

    // Get all items from compartments
    const allItems = Object.values(compartments).flat();

    // Helper function: Days until expiration
    const getDaysUntilExpiration = (expiryDate) => {
        if (!expiryDate) return null;
        const today = new Date();
        const expiry = new Date(expiryDate);
        return Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    };

    // Count total, expiring soon, and expired items
    let totalItems = allItems.length;
    let expiringSoonCount = 0;
    let expiredCount = 0;

    allItems.forEach((item) => {
        const daysUntilExpiry = getDaysUntilExpiration(item.expiryDate);
        if (daysUntilExpiry !== null) {
            if (daysUntilExpiry < 0) expiredCount++;
            if (daysUntilExpiry >= 0 && daysUntilExpiry <= 3) expiringSoonCount++;
        }
    });

    // Convert compartments into chart data
    const compartmentLabels = Object.keys(compartments);
    const compartmentCounts = compartmentLabels.map((key) => compartments[key].length);

    const compartmentChartData = {
        labels: compartmentLabels.map((label) => label.replace(/([A-Z])/g, " $1").trim()), // Format labels
        datasets: [
            {
                data: compartmentCounts,
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#9966FF"],
            },
        ],
    };

    // Sort items: Most used (expiring soon & low quantity) | Least used (long expiry & high quantity)
    const sortedItems = [...allItems].sort((a, b) => {
        const expiryA = new Date(a.expiryDate);
        const expiryB = new Date(b.expiryDate);
        return expiryA - expiryB || (a.quantity || 0) - (b.quantity || 0);
    });

    const mostUsed = sortedItems.slice(0, 4);
    const leastUsed = sortedItems.slice(-4);

    return (
        <div className="container">
            <h2>Analytics Dashboard</h2>

            {/* Summary Box */}
            <div className="summary-box">
                <p><strong>Total Items:</strong> {totalItems}</p>
                <p><strong>Expiring Soon (≤3 days):</strong> {expiringSoonCount}</p>
                <p><strong>Expired Items:</strong> {expiredCount}</p>
            </div>

            {/* Items by Compartment (Pie Chart) */}
            <section>
                <h3>Items by Compartment</h3>
                {totalItems > 0 ? <Pie data={compartmentChartData} /> : <p>No items in compartments.</p>}
            </section>

            {/* Most Used Items */}
            <section>
                <h3>Most Used Items:</h3>
                <div className="item-grid">
                    {mostUsed.map((item) => (
                        <div className="item-card" key={item.id}>
                            <div className="item-thumbnail">
                                <img src={`https://picsum.photos/seed/${item.id}/100/100`} alt={item.name} />
                            </div>
                            <p><strong>{item.name}</strong></p>
                            <p>Expires in: {getDaysUntilExpiration(item.expiryDate) < 0 ? "Expired" : `${getDaysUntilExpiration(item.expiryDate)} days`}</p>
                            <p>Qty: {item.quantity}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Least Used Items */}
            <section>
                <h3>Least Used Items:</h3>
                <div className="item-grid">
                    {leastUsed.map((item) => (
                        <div className="item-card" key={item.id}>
                            <div className="item-thumbnail">
                                <img src={`https://picsum.photos/seed/${item.id}/100/100`} alt={item.name} />
                            </div>
                            <p><strong>{item.name}</strong></p>
                            <p>Expires in: {getDaysUntilExpiration(item.expiryDate) < 0 ? "Expired" : `${getDaysUntilExpiration(item.expiryDate)} days`}</p>
                            <p>Qty: {item.quantity}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Navigation Links */}
            <div className="analytics-links">
                <Link to="/waste-pattern" className="analytics-btn">View Waste Pattern</Link>
                <Link to="/shopping-recommendation" className="analytics-btn">View Shopping Recommendations</Link>
            </div>
        </div>
    );
};

export default Analytics;