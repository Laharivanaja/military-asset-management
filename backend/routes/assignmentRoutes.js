const express = require("express");
const router = express.Router();
const Assignment = require("../models/assignment");
const Expenditure = require("../models/expenditure");
const { auth, authorize } = require("../middleware/auth");

// ASSIGN
router.post("/assign", auth, authorize("admin", "commander"), async (req, res) => {
  try {
    const { assetName, quantity, assignedTo, base } = req.body;

    const assignment = new Assignment({
      assetName,
      quantity,
      assignedTo,
      base,
    });

    await assignment.save();

    res.json({ message: "Asset assigned", assignment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// EXPEND
router.post("/expend", auth, authorize("admin", "commander"), async (req, res) => {
  try {
    const { assetName, quantity, base } = req.body;

    const expenditure = new Expenditure({
      assetName,
      quantity,
      base,
    });

    await expenditure.save();

    res.json({ message: "Asset expended", expenditure });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;