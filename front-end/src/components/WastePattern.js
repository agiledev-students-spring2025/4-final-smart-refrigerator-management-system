import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Analytics.css";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import API_BASE_URL from "../api";

const WastePattern = () => {
    const navigate = useNavigate();
    const formatDate = (date) => date.toISOString().split("T")[0]; // YYYY-MM-DD

    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);

    const [startDate, setStartDate] = useState(formatDate(today));
    const [endDate, setEndDate] = useState(formatDate(nextWeek));
    const [totalExpired, setTotalExpired] = useState(0);
    const [categoryItemMap, setCategoryItemMap] = useState({});
    const [totalTracked, setTotalTracked] = useState(0);

    useEffect(() => {
        if (!startDate || !endDate) return;

        const fetchWaste = async () => {
            try {
                // const res = await fetch(`${API_BASE_URL}/waste?startDate=${startDate}&endDate=${endDate}`);
                const token = localStorage.getItem("token");

                const res = await fetch(`${API_BASE_URL}/waste?startDate=${startDate}&endDate=${endDate}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await res.json();
                setTotalExpired(data.totalExpired);
                setCategoryItemMap(data.breakdown || {});

                const res2 = await fetch(`${API_BASE_URL}/analytics`);
                const a = await res2.json();
                setTotalTracked(data.totalTracked);
            } catch (err) {
                console.warn("Backend not available – showing empty waste data.");
                setTotalExpired(0);
                setCategoryItemMap({});
                setTotalTracked(0);
            }
        };

        fetchWaste();
    }, [startDate, endDate]);

    const labels = Object.keys(categoryItemMap);
    const dataValues = labels.map(label => categoryItemMap[label].length);

    const wasteChartData = {
        labels,
        datasets: [{
            data: dataValues,
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
                <p><strong>Total Items Tracked:</strong> {totalTracked}</p>
                <p><strong>Food Wasted:</strong> {totalTracked ? `${((totalExpired / totalTracked) * 100).toFixed(1)}%` : "0%"}</p>
                <p><strong>Estimated Cost Lost:</strong> ${totalExpired * 5}</p>
            </div>
            <h3>Waste Breakdown by Category:</h3>
            {totalExpired > 0 ? (
                <Pie
                    data={wasteChartData}
                    options={{
                        plugins: {
                            tooltip: {
                                callbacks: {
                                    label: function(context) {
                                        const label = context.label;
                                        const items = categoryItemMap[label] || [];
                                        return [
                                            `${items.length} item(s)`,
                                            ...items.map(name => `- ${name}`)
                                        ];
                                    }
                                }
                            }
                        }
                    }}
                />
            ) : (
                <p className="center-text">No expired items in selected date range.</p>
            )}
            <button className="back-btn" onClick={() => navigate("/analytics")}>← Back to Analytics</button>
        </div>
    );
};

export default WastePattern;