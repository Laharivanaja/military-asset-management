const express = require("express");
const router = express.Router();
const Transfer = require("../models/transfer");
const { auth, authorize } = require("../middleware/auth");

// CREATE TRANSFER
router.post("/", auth, authorize("admin", "logistics"), async (req, res) => {
  try {
    const { assetName, quantity, fromBase, toBase } = req.body;

    const transfer = new Transfer({
      assetName,
      quantity,
      fromBase,
      toBase,
    });

    await transfer.save();

    res.json({ message: "Transfer recorded", transfer });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET ALL TRANSFERS
router.get("/", auth, async (req, res) => {
  try {
    const transfers = await Transfer.find();

    res.json(transfers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;