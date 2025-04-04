import React, { useState } from "react";
import { useInventory } from "../contexts/InventoryContext";
import { useNavigate } from "react-router-dom";
import "./Analytics.css";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";

const WastePattern = () => {
    const navigate = useNavigate();
    const { getItemsByCompartment } = useInventory();
    const compartments = getItemsByCompartment();
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const getExpiredItems = () => {
        if (!startDate || !endDate) return [];
        const start = new Date(startDate);
        const end = new Date(endDate);
        return Object.entries(compartments).flatMap(([compartment, items]) =>
            items.filter((item) => {
                if (!item.expiryDate) return false;
                const expiry = new Date(item.expiryDate);
                return expiry >= start && expiry <= end;
            }).map((item) => ({ ...item, compartment }))
        );
    };

    const expiredItems = getExpiredItems();
    const totalExpired = expiredItems.length;
    const compartmentWaste = expiredItems.reduce((acc, item) => {
        const compartment = item.compartment || "Other";
        acc[compartment] = (acc[compartment] || 0) + 1;
        return acc;
    }, {});

    const wasteChartData = {
        labels: Object.keys(compartmentWaste).map((label) => label.replace(/([A-Z])/g, " $1").trim()),
        datasets: [{ data: Object.values(compartmentWaste), backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#9966FF"] }],
    };

    return (
        <div className="container">
            <h2>Waste Pattern</h2>
            <div className="date-selector">
                <label>Start Date: <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} /></label>
                <label>End Date: <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} /></label>
            </div>
            <div className="summary-box">
                <p><strong>Total Items Tracked:</strong> {totalExpired}</p>
                <p><strong>Food Wasted:</strong> {totalExpired > 0 ? `${((totalExpired / Object.values(compartments).flat().length) * 100).toFixed(1)}%` : "0%"}</p>
                <p><strong>Estimated Cost Lost:</strong> ${totalExpired * 5}</p>
            </div>
            <h3>Waste Breakdown by Fridge Section:</h3>
            {totalExpired > 0 ? <Pie data={wasteChartData} /> : <p className="center-text">No expired items in selected date range.</p>}
            {/* Back to Analytics Button */}
            <button className="back-btn" onClick={() => navigate("/analytics")}>← Back to Analytics</button>
        </div>
    );
};

export default WastePattern;