const express = require("express");
const router = express.Router();
const Purchase = require("../models/purchase");
const Transfer = require("../models/transfer");
const Assignment = require("../models/assignment");
const Expenditure = require("../models/expenditure");
const { auth } = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  try {
    const purchases = await Purchase.find();
    const transfers = await Transfer.find();
    const assignments = await Assignment.find();
    const expenditures = await Expenditure.find();

    let purchaseTotal = purchases.reduce((sum, p) => sum + p.quantity, 0);
    let transferIn = transfers.reduce((sum, t) => sum + t.quantity, 0);
    let transferOut = transfers.reduce((sum, t) => sum + t.quantity, 0);
    let assignedTotal = assignments.reduce((sum, a) => sum + a.quantity, 0);
    let expendedTotal = expenditures.reduce((sum, e) => sum + e.quantity, 0);

    let netMovement = purchaseTotal + transferIn - transferOut;
    let closingBalance = netMovement - assignedTotal - expendedTotal;

    res.json({
      purchaseTotal,
      transferIn,
      transferOut,
      assignedTotal,
      expendedTotal,
      netMovement,
      closingBalance,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;