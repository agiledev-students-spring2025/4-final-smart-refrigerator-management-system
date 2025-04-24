const express = require("express");
const router = express.Router();
const Item = require("../models/Item");
const verifyToken = require("../middleware/authMiddleware");

router.get("/", verifyToken, async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        const userId = req.user.userId;

        if (!startDate || !endDate) {
            return res.status(400).json({ error: "Start and end dates are required" });
        }

        const start = new Date(startDate);
        const end = new Date(endDate);

        const allItems = await Item.find({
            expirationDate: { $gte: start, $lte: end },
            owner: userId
        });

        const breakdown = {};
        allItems.forEach(item => {
            const key = item.category || "other";
            if (!breakdown[key]) breakdown[key] = [];
            breakdown[key].push(item.name);
        });

        res.json({
            totalExpired: allItems.length,
            breakdown,
            totalTracked: allItems.length //await Item.countDocuments({ owner: userId })
        });
    } catch (err) {
        console.error("Waste API error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;