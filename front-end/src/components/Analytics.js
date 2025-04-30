import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Analytics.css";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import API_BASE_URL from "../api";
import {FaArrowLeft} from "react-icons/fa";

const Analytics = () => {
    const [totalItems, setTotalItems] = useState(0);
    const [expiringSoonCount, setExpiringSoonCount] = useState(0);
    const [expiredCount, setExpiredCount] = useState(0);
    const [compartmentChartData, setCompartmentChartData] = useState({});
    const [mostUsed, setMostUsed] = useState([]);
    const [leastUsed, setLeastUsed] = useState([]);
    const [categoryItemMap, setCategoryItemMap] = useState({});
    const [nonExpiringCount, setNonExpiringCount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await fetch(`${API_BASE_URL}/analytics`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const data = await res.json();
                console.log("📦 Full analytics data:", data);
                setTotalItems(data.totalItems);
                setExpiringSoonCount(data.expiringSoon);
                setExpiredCount(data.expired);
                setNonExpiringCount(data.nonExpiring || 0);

                const labels = Object.keys(data.byCategory);
                const values = labels.map(label => data.byCategory[label].length);

                setCompartmentChartData({
                    labels,
                    datasets: [
                        {
                            data: values,
                            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#9966FF"],
                        },
                    ],
                });

                setCategoryItemMap(data.byCategory); // sets up tooltip data

                const filteredMostUsed = (data.mostUsed || []).filter(item => item.expirationDate);
                const filteredLeastUsed = (data.leastUsed || []).filter(item => item.expirationDate);

                setMostUsed(filteredMostUsed);
                setLeastUsed(filteredLeastUsed);
            } catch (err) {
                console.warn("⚠️ Analytics API not reachable — fallback to empty data.");
                setTotalItems(0);
                setExpiringSoonCount(0);
                setExpiredCount(0);
                setCompartmentChartData({
                    labels: [],
                    datasets: [{ data: [] }]
                });
                setMostUsed([]);
                setLeastUsed([]);
            }
        };

        fetchAnalytics();
    }, []);

    const getDaysUntilExpiration = (expirationDate) => {
        if (!expirationDate) return "No Expiration";
        const today = new Date();
        const expiry = new Date(expirationDate);
        const diff = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
        if (diff < 0) return "Expired";
        if (diff === 0) return "Today";
        return `Expires in: ${diff} day(s)`;
    };

    return (
        <div className="container">
            <h2>Analytics Dashboard</h2>

            {/* Summary Box */}
            <div className="summary-box">
                <p><strong>Total Items:</strong> {totalItems}</p>
                <p><strong>Expiring Soon (≤7 days):</strong> {expiringSoonCount}</p>
                <p><strong>Expired Items:</strong> {expiredCount}</p>
                <p><strong>Non-Expiring Items:</strong> {nonExpiringCount}</p>
            </div>

            {/* Items by Category (Pie Chart) */}
            <section>
                <h2 style={{ textAlign: "center" }}> Items by Category</h2>
                {totalItems > 0 ? (
                    <Pie
                        data={compartmentChartData}
                        options={{
                            plugins: {
                                tooltip: {
                                    callbacks: {
                                        label: function (context) {
                                            const category = context.label.toLowerCase();
                                            const items = categoryItemMap[category] || [];
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
                    <p style={{ textAlign: "center" }}>
                Fridge is Empty, get started now!{" "}
                <Link to="/scan" style={{ textDecoration: "underline", color: "#314c2c" }}>
                    Add Items
                </Link>
            </p>
                )}
            </section>

            {/* First to Expire Items */}
            <section>
                <h3 style={{textAlign:"center", margin: 0}}>Items Expiring Soon:</h3>
                {mostUsed.length > 0 ? (
                    <div className="item-grid">
                    {mostUsed.map((item) => (
                        <Link to={`/inventory/${item._id}`} key={item._id} className="item-card-link">
                            <div className="item-card" key={item._id}>
                                <div className="item-thumbnail">
                                    <img src={item.imageUrl || "https://picsum.photos/100"} alt={item.name}/>
                                </div>
                                <p><strong>{item.name}</strong></p>
                                <p>{getDaysUntilExpiration(item.expirationDate)}</p>
                            </div>
                        </Link>
                    ))}
                </div>
                ) : (
                    <p style={{ textAlign: "center"}}>No items</p>
                )}
            </section>

            {/* Last to Expire Items */}
            <section>
                <h3 style={{textAlign: "center", margin: 0}}>Items Expiring Last:</h3>
                {leastUsed.length > 0 ? (
                    <div className="item-grid">
                        {leastUsed.map((item) => (
                            <Link to={`/inventory/${item._id}`} key={item._id} className="item-card-link">
                                <div className="item-card" key={item._id}>
                                    <div className="item-thumbnail">
                                        <img src={item.imageUrl || "https://picsum.photos/100"} alt={item.name}/>
                                    </div>
                                    <p><strong>{item.name}</strong></p>
                                    <p>{getDaysUntilExpiration(item.expirationDate)}</p>
                                    <p>Qty: {item.quantity}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p style={{ textAlign: "center"}}>No items</p>
                )}

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