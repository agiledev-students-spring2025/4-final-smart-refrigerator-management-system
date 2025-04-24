const express = require("express");
const router = express.Router();
const Item = require("../models/Item");
const verifyToken = require("../middleware/authMiddleware");

router.get("/", verifyToken, async (req, res) => {
    try {
        const daysAhead = parseInt(req.query.daysAhead || 7);
        const today = new Date();
        const nextWindow = new Date();
        nextWindow.setDate(today.getDate() + daysAhead);

        const secondWindow = new Date();
        secondWindow.setDate(nextWindow.getDate() + 7); // 7 days after daysAhead

        const items = await Item.find({
            owner: req.user.userId,
            expirationDate: { $gte: today }
        });

        const mustBuy = [];
        const replenish = [];

        items.forEach(item => {
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
    } catch (err) {
        console.error("Recommendations error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;