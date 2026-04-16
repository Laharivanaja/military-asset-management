const express = require("express");
const router = express.Router();
const Purchase = require("../models/purchase");
const { auth, authorize } = require("../middleware/auth");

// CREATE PURCHASE (Admin + Logistics)
router.post("/", auth, authorize("admin", "logistics"), async (req, res) => {
  try {
    const { assetName, quantity, base } = req.body;

    const purchase = new Purchase({
      assetName,
      quantity,
      base,
    });

    await purchase.save();

    res.json({ message: "Purchase recorded", purchase });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET ALL PURCHASES
router.get("/", auth, async (req, res) => {
  try {
    const purchases = await Purchase.find();

    res.json(purchases);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;