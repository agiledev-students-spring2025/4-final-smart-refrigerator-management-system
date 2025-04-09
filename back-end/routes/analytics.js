const express = require("express");
const router = express.Router();
const inventory = require('../mockData/items');


router.get("/analytics", (req, res) => {
    const today = new Date();
    const totalItems = inventory.length;
    let expired = 0, expiringSoon = 0;
    const compartmentCounts = {};

    inventory.forEach(item => {
        const days = Math.ceil((new Date(item.expirationDate) - today) / (1000 * 60 * 60 * 24));
        if (days < 0) expired++;
        if (days >= 0 && days <= 3) expiringSoon++;
        const c = item.storageLocation || "other";
        compartmentCounts[c] = (compartmentCounts[c] || 0) + 1;
    });

    res.json({ totalItems, expiringSoon, expired, byCompartment: compartmentCounts });
});

module.exports = router;