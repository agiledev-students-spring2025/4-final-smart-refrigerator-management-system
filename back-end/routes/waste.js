const express = require("express");
const router = express.Router();
const inventory = require('../mockData/items');

router.get("/waste", (req, res) => {
    const { startDate, endDate } = req.query;
    const start = new Date(startDate);
    const end = new Date(endDate);

    const filtered = inventory.filter(item => {
        const expiry = new Date(item.expirationDate);
        return expiry >= start && expiry <= end;
    });

    const breakdown = {};
    filtered.forEach(item => {
        const c = item.storageLocation || "other";
        breakdown[c] = (breakdown[c] || 0) + 1;
    });

    res.json({ totalExpired: filtered.length, breakdown });
});

module.exports = router;