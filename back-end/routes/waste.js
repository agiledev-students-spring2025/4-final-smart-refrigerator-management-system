// const inventory = require('../mockData/items'); //remove later
//
// router.get("/waste", (req, res) => {
//     const { startDate, endDate } = req.query;
//     const start = new Date(startDate);
//     const end = new Date(endDate);
//
//     const filtered = inventory.filter(item => {
//         const expiry = new Date(item.expirationDate);
//         return expiry >= start && expiry <= end;
//     });
//
//     const breakdown = {};
//     filtered.forEach(item => {
//         const c = item.storageLocation || "other";
//         breakdown[c] = (breakdown[c] || 0) + 1;
//     });
//
//     res.json({ totalExpired: filtered.length, breakdown });
// });
//
// module.exports = router;

const express = require("express");
const router = express.Router();
const Item = require("../models/Item"); // Use teammate's model

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
            const c = item.storageLocation || "other";
            breakdown[c] = (breakdown[c] || 0) + 1;
        });

        res.json({ totalExpired: expiredItems.length, breakdown });
    } catch (err) {
        console.error("Waste API error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;