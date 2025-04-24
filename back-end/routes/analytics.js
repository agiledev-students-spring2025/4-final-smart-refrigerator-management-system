const express = require("express");
const router = express.Router();
const Item = require("../models/Item");
const verifyToken = require("../middleware/authMiddleware");

router.get("/", verifyToken, async (req, res) => {
    try {
        const userId = req.user.userId; // pulled from JWT
        const today = new Date();
        const soon = new Date();
        soon.setDate(today.getDate() + 3);

        const items = await Item.find({ owner: userId });

        const totalItems = items.length;

        const expiringSoon = items.filter(item =>
            item.expirationDate >= today && item.expirationDate <= soon
        ).length;

        const expired = items.filter(item =>
            item.expirationDate < today
        ).length;

        const byCategory = {};
        items.forEach(item => {
            const category = item.category || "other";
            if (!byCategory[category]) byCategory[category] = [];
            byCategory[category].push(item.name);
        });

        const sorted = [...items].sort((a, b) => {
            const expiryA = new Date(a.expirationDate);
            const expiryB = new Date(b.expirationDate);
            return expiryA - expiryB || parseInt(a.quantity) - parseInt(b.quantity);
        });

        const mostUsed = sorted.slice(0, 4);
        const leastUsed = sorted.slice(-4);

        res.json({ totalItems, expiringSoon, expired, byCategory, mostUsed, leastUsed });

    } catch (err) {
        console.error("Analytics error:", err);
        res.status(500).json({ error: "Analytics route failed" });
    }
});

module.exports = router;