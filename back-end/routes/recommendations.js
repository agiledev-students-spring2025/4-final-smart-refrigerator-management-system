const express = require("express");
const router = express.Router();
const inventory = require('../mockData/items');

router.get("/recommendations", (req, res) => {
    const daysAhead = parseInt(req.query.daysAhead || 7);
    const today = new Date();

    const mustBuy = [];
    const replenish = [];

    inventory.forEach(item => {
        const daysLeft = Math.ceil((new Date(item.expirationDate) - today) / (1000 * 60 * 60 * 24));

        if (daysLeft >= 0 && daysLeft <= daysAhead) {
            mustBuy.push({
                name: item.name,
                daysUntilExpiration: daysLeft
            });
        } else if (daysLeft > daysAhead && daysLeft <= daysAhead + 7) {
            replenish.push({
                name: item.name,
                daysUntilExpiration: daysLeft
            });
        }
    });

    res.json({ mustBuy, replenish });
});

module.exports = router;