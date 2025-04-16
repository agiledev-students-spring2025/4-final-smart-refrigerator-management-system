const express = require("express");
const router = express.Router();
const inventory = require('../mockData/items'); //remove this after db implement


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

// const Item = require("../models/Item"); // Wait until this is available

// const express = require("express");
// const router = express.Router();
// const Item = require("../models/Item"); // Use this once it's available
//
// router.get("/", async (req, res) => {
//     try {
//         const today = new Date();
//         const soon = new Date();
//         soon.setDate(today.getDate() + 3);
//
//         const totalItems = await Item.countDocuments();
//
//         const expiringSoon = await Item.countDocuments({
//             expirationDate: { $gte: today, $lte: soon }
//         });
//
//         const expired = await Item.countDocuments({
//             expirationDate: { $lt: today }
//         });
//
//         const byCompartmentAgg = await Item.aggregate([
//             {
//                 $group: {
//                     _id: "$storageLocation",
//                     count: { $sum: 1 }
//                 }
//             }
//         ]);
//
//         const byCompartment = {};
//         byCompartmentAgg.forEach(group => {
//             byCompartment[group._id || "other"] = group.count;
//         });
//
//         res.json({ totalItems, expiringSoon, expired, byCompartment });
//     } catch (err) {
//         console.error("Analytics error:", err);
//         res.status(500).json({ error: "Analytics route failed" });
//     }
// });
//
// module.exports = router;