const mongoose = require("mongoose");

const expenditureSchema = new mongoose.Schema({
  assetName: String,
  quantity: Number,
  base: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Expenditure", expenditureSchema);