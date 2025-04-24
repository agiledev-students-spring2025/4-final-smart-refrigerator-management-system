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
                setTotalItems(data.totalItems);
                setExpiringSoonCount(data.expiringSoon);
                setExpiredCount(data.expired);

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

                setMostUsed(data.mostUsed || []);
                setLeastUsed(data.leastUsed || []);
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
        if (!expirationDate) return null;
        const today = new Date();
        const expiry = new Date(expirationDate);
        return Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    };

    return (
        <div className="container">
            <h2>Analytics Dashboard</h2>

            {/* Summary Box */}
            <div className="summary-box">
                <p><strong>Total Items:</strong> {totalItems}</p>
                <p><strong>Expiring Soon (≤7 days):</strong> {expiringSoonCount}</p>
                <p><strong>Expired Items:</strong> {expiredCount}</p>
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
                    />                ) : (
                    <p style={{ textAlign: "center"}}>No items</p>
                )}
            </section>

            {/* Most Used Items */}
            <section>
                <h3 style={{textAlign:"center", margin: 0}}>Most Used Items:</h3>
                <div className="item-grid">
                    {mostUsed.map((item) => (
                        <Link to={`/inventory/${item._id}`} key={item._id} className="item-card-link">
                            <div className="item-card" key={item._id}>
                                <div className="item-thumbnail">
                                    <img src={item.imageUrl || "https://picsum.photos/100"} alt={item.name}/>
                                </div>
                                <p><strong>{item.name}</strong></p>
                                <p>Expires
                                    in: {getDaysUntilExpiration(item.expirationDate) < 0 ? "Expired" : `${getDaysUntilExpiration(item.expirationDate)} days`}</p>
                                <p>Qty: {item.quantity}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Least Used Items */}
            <section>
                <h3 style={{textAlign:"center", margin: 0}}>Least Used Items:</h3>
                <div className="item-grid">
                    {leastUsed.map((item) => (
                        <Link to={`/inventory/${item._id}`} key={item._id} className="item-card-link">
                            <div className="item-card" key={item._id}>
                                <div className="item-thumbnail">
                                    <img src={item.imageUrl || "https://picsum.photos/100"} alt={item.name}/>
                                </div>
                                <p><strong>{item.name}</strong></p>
                                <p>Expires in: {getDaysUntilExpiration(item.expirationDate) < 0 ? "Expired" : `${getDaysUntilExpiration(item.expirationDate)} days`}</p>
                                <p>Qty: {item.quantity}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Navigation Links */}
            <div className="analytics-links">
                <div className="back-button" onClick={() => navigate("/home")}>
                    <FaArrowLeft/> Back
                </div>
                <Link to="/waste-pattern" className="analytics-btn">View Waste Pattern</Link>
                <Link to="/shopping-recommendation" className="analytics-btn">View Shopping Recommendations</Link>
            </div>
        </div>
    );
};

export default Analytics;