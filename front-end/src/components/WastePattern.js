import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Analytics.css";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";

const WastePattern = () => {
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [totalExpired, setTotalExpired] = useState(0);
    const [compartmentWaste, setCompartmentWaste] = useState({});
    const [totalTracked, setTotalTracked] = useState(0); // For percentage

    useEffect(() => {
        if (!startDate || !endDate) return;

        fetch(`http://localhost:5001/api/waste?startDate=${startDate}&endDate=${endDate}`)
            .then(res => res.json())
            .then(data => {
                setTotalExpired(data.totalExpired);
                setCompartmentWaste(data.breakdown);
            });

        fetch("http://localhost:5001/api/analytics")
            .then(res => res.json())
            .then(data => setTotalTracked(data.totalItems));
    }, [startDate, endDate]);

    const wasteChartData = {
        labels: Object.keys(compartmentWaste).map(label => label.replace(/([A-Z])/g, " $1").trim()),
        datasets: [{
            data: Object.values(compartmentWaste),
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#9966FF"]
        }]
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
                <p><strong>Food Wasted:</strong> {totalExpired > 0 && totalTracked > 0 ? `${((totalExpired / totalTracked) * 100).toFixed(1)}%` : "0%"}</p>
                <p><strong>Estimated Cost Lost:</strong> ${totalExpired * 5}</p>
            </div>
            <h3>Waste Breakdown by Fridge Section:</h3>
            {totalExpired > 0 ? (
                <Pie data={wasteChartData} />
            ) : (
                <p className="center-text">No expired items in selected date range.</p>
            )}
            <button className="back-btn" onClick={() => navigate("/analytics")}>← Back to Analytics</button>
        </div>
    );
};

export default WastePattern;