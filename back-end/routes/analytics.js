const express = require("express");
const router = express.Router();
const Item = require("../models/Item"); // Use this once it's available

router.get("/", async (req, res) => {
    try {
        const today = new Date();
        const soon = new Date();
        soon.setDate(today.getDate() + 3);

        const totalItems = await Item.countDocuments();

        const expiringSoon = await Item.countDocuments({
            expirationDate: { $gte: today, $lte: soon }
        });

        const expired = await Item.countDocuments({
            expirationDate: { $lt: today }
        });

        const byCategoryAgg = await Item.aggregate([
            { $group: { _id: "$category", count: { $sum: 1 } } }
        ]);

        const byCategory = {};
        byCategoryAgg.forEach(group => {
            byCategory[group._id || "other"] = group.count;
        });

        const items = await Item.find({});
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