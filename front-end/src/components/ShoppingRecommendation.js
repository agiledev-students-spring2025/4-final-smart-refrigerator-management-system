import React from "react";
import { useInventory } from "../contexts/InventoryContext";
import "./Analytics.css";

const ShoppingRecommendation = () => {
    const { getItemsByCompartment } = useInventory();
    const compartments = getItemsByCompartment();

    const lowStockItems = [];
    Object.values(compartments).forEach((items) => {
        items.forEach((item) => {
            if (item.quantity && item.quantity <= 2) {
                lowStockItems.push(item);
            }
        });
    });

    return (
        <div className="container">
            <h2>Shopping Recommendation</h2>
            <p><strong>Low Stock Items:</strong> {lowStockItems.length}</p>
            <ul>
                {lowStockItems.map((item) => <li key={item.id}>{item.name} (Qty: {item.quantity})</li>)}
            </ul>
        </div>
    );
};

export default ShoppingRecommendation;