const express = require("express");
const router = express.Router();
const Item = require("../models/Item");

router.get("/", async (req, res) => {
    try {
        const { startDate, endDate } = req.query;

        if (!startDate || !endDate) {
            return res.status(400).json({ error: "Start and end dates are required" });
        }

        const start = new Date(startDate);
        const end = new Date(endDate);

        const expiredItems = await Item.find({
            expirationDate: { $gte: start, $lte: end }
        });

        const breakdown = {};
        expiredItems.forEach(item => {
            const key = item.category || "other";
            if (!breakdown[key]) breakdown[key] = [];
            breakdown[key].push(item.name);
        });

        res.json({ totalExpired: expiredItems.length, breakdown });
    } catch (err) {
        console.error("Waste API error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;